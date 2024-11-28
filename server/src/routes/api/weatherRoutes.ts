import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const city = req.body.city;
    const weather = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await HistoryService.removeCity(id);
    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
