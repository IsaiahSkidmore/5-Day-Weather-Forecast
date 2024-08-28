import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

class City {
  id: string;
  name: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {

  private async read() {
    return await fs.readFile("db/db.json", "utf-8");
  }

  private async write(cities: City[]) {
    return await fs.writeFile("db/db.json", JSON.stringify(cities, null, 2));
  }

  async getCities() {
      return await this.read().then(cities => {
      let parsedCities: City[]
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (error) {
        parsedCities = [];
      }
      return parsedCities;
    });

    
  }

  async addCity(city: string) {
    if (!city) {
      throw new Error("City name is required");
    }
    
    const newCity = new City(city, uuidv4());
    return await this.getCities().then(cities => {
      if (cities.find(index => index.name === city)) {
        return cities;
      }
      return [...cities, newCity];
    })
    .then(updatedCities => this.write(updatedCities))
    .then(() => newCity);
  }
 
}

export default new HistoryService();
