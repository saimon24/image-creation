"""usage: python water_mask.py <painting.png> <measure.json> <seeds.json> <id> <out_mask.png>
GrabCut the painted water out of a theme painting (1024x1536).
Sure water: discs round the hand-picked seed points (+ optional strokes).
Sure ground: the measured plot clearings and everything far from any likely water.
Likely water: pixels near the seeds' colours within a corridor round the seeds/strokes."""
import json, sys
import cv2
import numpy as np

img_path, measure_path, seeds_path, theme, out_path = sys.argv[1:6]
img = cv2.resize(cv2.imread(img_path), (1024, 1536), interpolation=cv2.INTER_AREA)
H, W = img.shape[:2]
m = json.load(open(measure_path))
cfg = json.load(open(seeds_path))[theme]
seeds = cfg.get('seeds', [])
strokes = cfg.get('strokes', [])  # polylines through the water, [[x,y],...]
polys = cfg.get('polys', [])
reach = cfg.get('reach', 140)  # how far from seeds/strokes water may extend

mask = np.full((H, W), cv2.GC_BGD, np.uint8)
near = np.zeros((H, W), np.uint8)
for x, y in seeds:
    cv2.circle(near, (x, y), reach, 255, -1)
for s in strokes:
    cv2.polylines(near, [np.array(s, np.int32)], False, 255, reach * 2)
for p in polys:
    cv2.fillPoly(near, [np.array(p, np.int32)], 255)
    cv2.polylines(near, [np.array(p, np.int32)], True, 255, reach)

# likely water inside the reach: colour close to the seeds' colours (Lab)
lab = cv2.cvtColor(cv2.GaussianBlur(img, (5, 5), 0), cv2.COLOR_BGR2LAB).astype(np.float32)
refs = [lab[y, x] for x, y in seeds] + [lab[int(p[1]), int(p[0])] for s in strokes for p in s[::2]]
d = np.min(np.stack([np.linalg.norm(lab - r, axis=2) for r in refs]), axis=0) if refs else np.full((H, W), 999.0)
mask[near > 0] = cv2.GC_PR_BGD
mask[(near > 0) & (d < cfg.get('tol', 28))] = cv2.GC_PR_FGD

sure = np.zeros((H, W), np.uint8)
for x, y in seeds:
    cv2.circle(sure, (x, y), cfg.get('seedR', 7), 255, -1)
for s in strokes:
    cv2.polylines(sure, [np.array(s, np.int32)], False, 255, cfg.get('strokeW', 5))
for p in polys:
    cv2.fillPoly(sure, [np.array(p, np.int32)], 255)
mask[sure > 0] = cv2.GC_FGD

# plots are ground
sc = {k: v / 2 for k, v in m['scene'].items()}
for p in m['plotRings'].values():
    cx, cy = sc['left'] + p['x'] * sc['width'], sc['top'] + p['y'] * sc['height']
    cv2.ellipse(mask, (int(cx), int(cy)), (int(0.07 * sc['width']), int(0.03 * sc['height'])), 0, 0, 360, cv2.GC_BGD, -1)

bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
cv2.grabCut(img, mask, None, bgd, fgd, 6, cv2.GC_INIT_WITH_MASK)
water = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
# keep only blobs that contain a seed / stroke / poly; close small holes
water = cv2.morphologyEx(water, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
n, lbl = cv2.connectedComponents(water)
keep = set(lbl[sure > 0].tolist()) - {0}
water = np.where(np.isin(lbl, list(keep)), 255, 0).astype(np.uint8)
cv2.imwrite(out_path, water)
print(theme, 'water px', int((water > 0).sum()))
