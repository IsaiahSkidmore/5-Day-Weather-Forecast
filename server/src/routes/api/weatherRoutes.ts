import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';
const router = Router();


router.post('/', (req: Request, res: Response) => {
  const cityName = req.body.cityName;
  weatherService.getWeatherForCity(cityName).then((data: any) => {
    historyService.addCity(data[0].city);
    res.json(data);
  }).catch ((error) => {
  console.error(`Error saving the city to search history: ${error}`);
  res.status(500).send('Internal Server Error');
  })
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  historyService.getCities().then((data) => {
    return res.json(data);
  }).catch ((error) => {
  console.error(`Error saving the city to search history: ${error}`);
  res.status(500).send('Internal Server Error');
  })
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (_req, _res) => {
//   const id = _req.params.id;
  
// });

export default router;
