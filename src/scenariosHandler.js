import express from 'express';
import Scenario from './scenario';

const setScenarios = (req, res) => {
  const scenarios = req.body.scenarios;

  Scenario.set(scenarios).then(() => {
    res.json({
      message: `${scenarios} successfully applied.`
    });
  }).catch(() => {
    res.status(500).json({
      message: 'Something is broken'
    });
  });
};

function clearScenarios(req, res) {
  Scenario.clear().then(() => {
    res.json({
      message: 'Scenarios successfully cleared.'
    });
  });
}

function getScenarios(req, res) {
    Scenario.get().then((scenarios) => {
      res.json(scenarios);
    }).catch((err) => {
      res.status(500).json({
        err
      });
    })
}

export default function Router() {
  const router = express.Router();
  router.route('/').get(getScenarios);
  router.route('/').post(setScenarios);
  router.route('/').delete(clearScenarios);
  return router;
}
