import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const city = req.body.city;
        const weather = await WeatherService.getWeatherForCity(city);
        await HistoryService.addCity(city);
        res.json(weather);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        const history = await HistoryService.getCities();
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await HistoryService.removeCity(id);
        res.json({ message: 'City deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
