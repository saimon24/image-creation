"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Style {
  filename: string;
  name: string;
}

interface StyleSelectorProps {
  styles: Style[];
  value: string;
  onChange: (value: string) => void;
}

export function StyleSelector({ styles, value, onChange }: StyleSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select style" />
      </SelectTrigger>
      <SelectContent>
        {styles.map((style) => (
          <SelectItem key={style.filename} value={style.filename}>
            {style.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
