// Offline twin of components/farm-map/FarmSign.tsx: draws every sign (frame 0)
// with the owner's name and the banner word, using the iOS system font
// (SF Pro, black weight) and the same layout maths, into one contact sheet.
// Usage: swift render.swift spec.json signsDir out.png [word]
import AppKit
import CoreText
import Foundation
import ImageIO

let args = CommandLine.arguments
let spec = try! JSONSerialization.jsonObject(with: Data(contentsOf: URL(fileURLWithPath: args[1]))) as! [[String: Any]]
let signsDir = args[2]
let outPath = args[3]
let word = args.count > 4 ? args[4] : "FARM"
let names = ["Farmer#97236", "Sunflower Valley", "Jo"]

// ---- the same constants as FarmSign.tsx ----
let WIDTH: CGFloat = 230            // the Farm Map sign, in points
let ASPECT: CGFloat = 1536.0 / 1024.0
let TITLE_SIZE: CGFloat = 0.085      // of the width
let TITLE_LINE: CGFloat = 1.25       // line box, of the font size
let TITLE_FILL: CGFloat = 0.8        // the name's font size at most this much of the face height
let TITLE_MIN_SCALE: CGFloat = 0.5
let LETTER_WIDTH: [Character: CGFloat] = [
  "A": 0.74, "C": 0.72, "D": 0.74, "E": 0.62, "F": 0.6, "G": 0.76, "H": 0.76, "L": 0.58, "M": 0.88,
  "N": 0.76, "O": 0.8, "R": 0.7, "S": 0.66, "T": 0.62, "W": 1.0, "Y": 0.7,
]
let SCALE: CGFloat = 2

func color(_ s: String) -> CGColor {
  if s.hasPrefix("#") {
    let v = Int(s.dropFirst(), radix: 16)!
    return CGColor(red: CGFloat((v >> 16) & 255) / 255, green: CGFloat((v >> 8) & 255) / 255, blue: CGFloat(v & 255) / 255, alpha: 1)
  }
  if s == "transparent" { return CGColor(red: 0, green: 0, blue: 0, alpha: 0) }
  let nums = s.replacingOccurrences(of: "rgba(", with: "").replacingOccurrences(of: "rgb(", with: "").replacingOccurrences(of: ")", with: "")
    .split(separator: ",").map { CGFloat(Double($0.trimmingCharacters(in: .whitespaces))!) }
  return CGColor(red: nums[0] / 255, green: nums[1] / 255, blue: nums[2] / 255, alpha: nums.count > 3 ? nums[3] : 1)
}

func font(_ size: CGFloat) -> NSFont { NSFont.systemFont(ofSize: size, weight: .black) }

func line(_ text: String, _ size: CGFloat, _ c: CGColor) -> CTLine {
  let attr = NSAttributedString(string: text, attributes: [
    NSAttributedString.Key(kCTFontAttributeName as String): font(size),
    NSAttributedString.Key(kCTForegroundColorAttributeName as String): c,
  ])
  return CTLineCreateWithAttributedString(attr)
}
func lineWidth(_ l: CTLine) -> CGFloat { CGFloat(CTLineGetTypographicBounds(l, nil, nil, nil)) }

/// Draws `text` centred horizontally on `cx`, in a line box of height `lineHeight`
/// whose top is `top` (RN iOS centres the font's ascender..descender in the box).
/// Coordinates in points, y down; ctx is y-up in pixels.
func drawText(_ ctx: CGContext, _ text: String, size: CGFloat, color c: CGColor, cx: CGFloat, top: CGFloat, lineHeight: CGFloat,
              shadow: CGColor?, shadowOffset: CGSize, shadowRadius: CGFloat, canvasH: CGFloat, rotate: CGFloat = 0, pivot: CGPoint? = nil) {
  let f = font(size)
  let a = f.ascender, d = -f.descender
  let baseline = top + lineHeight / 2 + (a - d) / 2
  let l = line(text, size, c)
  let w = lineWidth(l)
  ctx.saveGState()
  ctx.scaleBy(x: SCALE, y: SCALE)
  // to y-down points
  ctx.translateBy(x: 0, y: canvasH)
  ctx.scaleBy(x: 1, y: -1)
  if let p = pivot { ctx.translateBy(x: p.x, y: p.y); ctx.rotate(by: rotate); ctx.translateBy(x: -p.x, y: -p.y) }
  if let s = shadow { ctx.setShadow(offset: CGSize(width: shadowOffset.width * SCALE, height: -shadowOffset.height * SCALE), blur: shadowRadius * SCALE, color: s) }
  // CoreText draws y-up: flip locally around the baseline
  ctx.translateBy(x: cx - w / 2, y: baseline)
  ctx.scaleBy(x: 1, y: -1)
  ctx.textPosition = .zero
  CTLineDraw(l, ctx)
  ctx.restoreGState()
}

func firstFrame(_ id: String) -> CGImage {
  let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: "\(signsDir)/\(id).webp") as CFURL, nil)!
  return CGImageSourceCreateImageAtIndex(src, 0, nil)!
}

func drawSign(_ ctx: CGContext, _ s: [String: Any], _ name: String, ox: CGFloat, oy: CGFloat, canvasH: CGFloat) {
  let banner = s["banner"] as! [String: Any], title = s["title"] as! [String: Any]
  func n(_ d: [String: Any], _ k: String) -> CGFloat { CGFloat((d[k] as! NSNumber).doubleValue) }
  let width = WIDTH, height = WIDTH / ASPECT
  // art
  let img = firstFrame(s["id"] as! String)
  ctx.draw(img, in: CGRect(x: ox * SCALE, y: (canvasH - oy - height) * SCALE, width: width * SCALE, height: height * SCALE))

  // ---- banner word (BannerText) ----
  let baseSize = max(9, (width * 0.042).rounded())
  let letters = Array(word)
  func span(_ sz: CGFloat) -> CGFloat { letters.reduce(0) { $0 + (LETTER_WIDTH[$1] ?? 0.72) * sz } + sz * 0.34 * CGFloat(letters.count - 1) }
  let room = n(banner, "w") * width * 0.68
  let size = min(baseSize, n(banner, "h") * height * 0.72, baseSize * room / span(baseSize))
  let gap = size * 0.34
  let cellHeight = size * 1.3
  var cursor = -span(size) / 2
  let arch = n(banner, "arch")
  for letter in letters {
    let adv = (LETTER_WIDTH[letter] ?? 0.72) * size
    let dx = cursor + adv / 2
    cursor += adv + gap
    let u = dx / width
    let drop = arch * u * u * height
    let angle = atan((2 * arch * u * height) / width)
    let cx = ox + n(banner, "x") * width + dx
    let top = oy + n(banner, "y") * height + drop - cellHeight / 2
    let pivot = CGPoint(x: cx, y: top + cellHeight / 2)
    drawText(ctx, String(letter), size: size, color: color(banner["shadow"] as! String), cx: cx, top: top + 1, lineHeight: cellHeight,
             shadow: nil, shadowOffset: .zero, shadowRadius: 0, canvasH: canvasH, rotate: angle, pivot: pivot)
    drawText(ctx, String(letter), size: size, color: color(banner["color"] as! String), cx: cx, top: top, lineHeight: cellHeight,
             shadow: color("rgba(0, 0, 0, 0.35)"), shadowOffset: CGSize(width: 0, height: -0.6), shadowRadius: 0.5, canvasH: canvasH, rotate: angle, pivot: pivot)
  }

  // ---- the name ----
  let base = max(14, (width * TITLE_SIZE).rounded())
  let natural = lineWidth(line(name, base, color("#000")))
  let titleRoom = width * n(title, "widthFraction")
  let fit = min(base, n(title, "h") * height * TITLE_FILL, base * titleRoom / natural)
  let titleSize = max(fit, base * TITLE_MIN_SCALE)
  let lh = titleSize * TITLE_LINE
  drawText(ctx, name, size: titleSize, color: color(title["color"] as! String), cx: ox + width / 2, top: oy + n(title, "y") * height - lh / 2,
           lineHeight: lh, shadow: color(title["shadow"] as! String), shadowOffset: CGSize(width: 0, height: 1), shadowRadius: 3, canvasH: canvasH)
}

// ---- sheet: one row of 3 names per sign, two signs side by side ----
let tileW = WIDTH + 16, tileH = WIDTH / ASPECT + 34
let perRow = 2
let cols = names.count * perRow
let rows = Int((Double(spec.count) / Double(perRow)).rounded(.up))
let canvasW = CGFloat(cols) * tileW + CGFloat(perRow - 1) * 20, canvasH = CGFloat(rows) * tileH
let ctx = CGContext(data: nil, width: Int(canvasW * SCALE), height: Int(canvasH * SCALE), bitsPerComponent: 8, bytesPerRow: 0,
                    space: CGColorSpace(name: CGColorSpace.sRGB)!, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
ctx.setFillColor(color("#cfe3c6")); ctx.fill(CGRect(x: 0, y: 0, width: canvasW * SCALE, height: canvasH * SCALE))
for (i, s) in spec.enumerated() {
  for (j, name) in names.enumerated() {
    let ox = CGFloat((i % perRow) * names.count + j) * tileW + CGFloat(i % perRow) * 20 + 8
    let oy = CGFloat(i / perRow) * tileH + 18
    drawSign(ctx, s, name, ox: ox, oy: oy, canvasH: canvasH)
    if j == 0 {
      drawText(ctx, s["id"] as! String, size: 11, color: color("#333333"), cx: ox + 40, top: oy - 16, lineHeight: 14, shadow: nil, shadowOffset: .zero, shadowRadius: 0, canvasH: canvasH)
    }
  }
}
let out = ctx.makeImage()!
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: outPath) as CFURL, "public.png" as CFString, 1, nil)!
CGImageDestinationAddImage(dest, out, nil)
CGImageDestinationFinalize(dest)
print("wrote \(outPath) \(out.width)x\(out.height)")
