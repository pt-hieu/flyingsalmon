import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from '@/registry/ui/select'

export function SelectLongList() {
  return (
    <Select
      className="w-64"
      label="Departure airport"
      placeholder="Choose an airport"
    >
      <SelectGroup>
        <SelectLabel>Recent</SelectLabel>
        <SelectItem value="sgn">
          Tan Son Nhat International Airport (SGN)
        </SelectItem>
        <SelectItem value="nrt">Narita International Airport (NRT)</SelectItem>
      </SelectGroup>
      <SelectSeparator />
      <SelectGroup>
        <SelectLabel>All airports</SelectLabel>
        <SelectItem value="lhr">London Heathrow Airport (LHR)</SelectItem>
        <SelectItem value="cdg">
          Paris Charles de Gaulle Airport (CDG)
        </SelectItem>
        <SelectItem value="dxb">Dubai International Airport (DXB)</SelectItem>
        <SelectItem value="sin">Singapore Changi Airport (SIN)</SelectItem>
        <SelectItem value="hnd">Tokyo Haneda Airport (HND)</SelectItem>
        <SelectItem value="ist">Istanbul Airport (IST)</SelectItem>
        <SelectItem value="fra">Frankfurt Airport (FRA)</SelectItem>
        <SelectItem value="ams">Amsterdam Airport Schiphol (AMS)</SelectItem>
        <SelectItem value="lax">
          Los Angeles International Airport (LAX)
        </SelectItem>
        <SelectItem value="jfk">
          John F. Kennedy International Airport (JFK)
        </SelectItem>
      </SelectGroup>
    </Select>
  )
}
