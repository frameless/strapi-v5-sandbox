import * as fs from 'node:fs';
import * as path from 'node:path';
import { create } from 'xmlbuilder2/lib';

const dir = './dist';

(function generateGemeenetJson() {
  fs.readFile(require.resolve(path.resolve(process.cwd(), 'src/gemeente.xml')), (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }

    const doc = create(data.toString());
    const gemeenteJson = doc.toObject();
    fs.writeFileSync(`${dir}/gemeente.json`, JSON.stringify(gemeenteJson));
  });
})();
