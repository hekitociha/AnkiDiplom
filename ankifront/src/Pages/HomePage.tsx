import { Card, CardContent, Typography, Button, CardActions, Box } from "@mui/material";
import { useState } from "react"
import ReactCardFlip from 'react-card-flip';

export const HomePage = () => {

  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const flipCard = () => {
    setIsFlipped(prevState => !prevState)
  }

  return (
    <div>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <Card sx={{ minWidth: 275 }} onClick={flipCard}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            FRONT
          </Typography>
          <Typography variant="h5" component="div">
            123
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Card sx={{ minWidth: 275 }} onClick={flipCard}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            BACK
          </Typography>
          <Typography variant="h5" component="div">
            123
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </ReactCardFlip>
    </div>
  )
}
