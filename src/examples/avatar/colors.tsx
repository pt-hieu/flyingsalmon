import { Avatar, AvatarColor } from '@/registry/ui/avatar'

const travellers = [
  { name: 'Brian Nguyen', color: AvatarColor.Sky },
  { name: 'Linh Tran', color: AvatarColor.Pink },
  { name: 'Minh Pham', color: AvatarColor.Teal },
  { name: 'Hoa Le', color: AvatarColor.Fuchsia },
  { name: 'Anh Vo', color: AvatarColor.Cyan },
  { name: 'Khoa Dang', color: AvatarColor.Blue },
]

export function AvatarColors() {
  return (
    <>
      {travellers.map((traveller) => (
        <Avatar
          key={traveller.name}
          name={traveller.name}
          color={traveller.color}
        />
      ))}
      <Avatar name="Guest" />
    </>
  )
}
