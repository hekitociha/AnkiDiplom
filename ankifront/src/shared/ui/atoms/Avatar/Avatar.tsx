import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { User } from "../../../../entities/User"
import { request } from "../../../../Services/request"

export const ProfileAvatar = () => {
  const [user, setUser] = useState<User>()
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatarSrc)

  useEffect(() => {
    request.get<User>("/profile").then(data => {
      setAvatar(data.data.avatarSrc)
    })
  }, [])

  return (
    <Avatar style={{backgroundSize: "cover"}}><img src={"https://localhost:5001/" + avatar}/></Avatar>
  )
}
