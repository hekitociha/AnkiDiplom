import {Badge, Card, CardActions, CardContent, Typography } from "@mui/material"
import './DeckStyle.scss'

interface DeckComponentProps {
  topic: string;
}

export const DeckComponent:React.FC<DeckComponentProps> = ({topic}) => {
  return (
    <div>
      <Card className="card-one card" sx={{ minWidth: 275 }} >
      <CardContent>
          
        </CardContent>
      </Card>
      <Card className="card-two card" sx={{ minWidth: 275 }} >
      <CardContent>
          
        </CardContent>
      </Card>
      <Card className="card-three card" sx={{ minWidth: 275 }}>
        <CardContent>
          <Badge badgeContent={topic} className="badge"></Badge>
        </CardContent>
      </Card>
    </div>
  )
}
