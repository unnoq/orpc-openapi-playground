import { osw } from '../orpc'
import { me, refresh, revoke, signin, signup } from './auth'
import {
  createPlanet,
  deletePlanet,
  findPlanet,
  listPlanets,
  updatePlanet,
  updatePlanetImage,
} from './planet'

export const router = osw.router({
  auth: osw.tags('Authentication').prefix('/auth').router({
    signup,
    signin,
    refresh,
    revoke,
    me,
  }),

  planet: osw.tags('Planets').prefix('/planets').router({
    list: listPlanets,
    create: createPlanet,
    find: findPlanet,
    update: updatePlanet,
    updateImage: updatePlanetImage,
    delete: deletePlanet,
  }),
})
