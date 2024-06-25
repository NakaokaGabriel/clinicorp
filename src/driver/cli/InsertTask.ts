import fs from 'fs';

import InsertTask from "../../application/usecases/InsertTask";

export default class InsertCliTask {
  constructor (
    readonly insertTask: InsertTask
  ) {}

  async execute(options: any) {
    const value = options.insert;

    fs.stat(value, async (fileError, stats) => {
      if (fileError && fileError.code === 'ENOENT') {
        try {
          const input = JSON.parse(value);
          const response = await this.insertTask.execute(input);
          console.log(JSON.stringify({message: `Usuário${response.length > 0 ? 's' : ''} criado com sucesso!`, info: "String json"}));
          process.exit(1);
        } catch (error: any) {
          console.error(`Erro ao parsear JSON para string: ${error.message}`);
          process.exit(1);
        }
      }

      if (!fileError && stats.isFile()) {
        fs.readFile(value, 'utf8', async (readError, data) => {
          if (readError) {
            console.error(`Erro ao ler arquivo: ${readError.message}`);
            process.exit(1);
          }

          try {
            const input = JSON.parse(data);
            const response = await this.insertTask.execute(input);
            console.log(JSON.stringify({message: `Usuário${response.length > 0 ? 's' : ''} criado com sucesso!`, info: "JSON como string"}));
            process.exit(1);
          } catch (error: any) {
            console.error(`Erro ao parsear o arquivo JSON: ${error.message}`);
            process.exit(1);
          }
        });
      }
    });
  }
}