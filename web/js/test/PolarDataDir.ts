import {FilePaths} from '../util/FilePaths';
import {Files} from '../util/Files';
import {Logger} from '../logger/Logger';
import {Directories} from '../datastore/Directories';

const log = Logger.create();

export class PolarDataDir {

    public static useFreshDirectory(name: string): string {

        const dataDir = FilePaths.createTempName(name);
        process.env.POLAR_DATA_DIR = dataDir;
        Files.removeDirectoryRecursively(dataDir);

        const directories = new Directories();

        Files.createDirSync(directories.dataDir),
        Files.createDirSync(directories.stashDir),
        Files.createDirSync(directories.logsDir),
        Files.createDirSync(directories.configDir),

        log.info("Using polar data dir: " + dataDir);

        return dataDir;

    }

    public static async reuseDirectory(name: string): Promise<string> {

        const dataDir = FilePaths.createTempName(name);
        process.env.POLAR_DATA_DIR = dataDir;

        const directories = new Directories();
        await directories.init();

        log.info("Using polar data dir: " + dataDir);

        return dataDir;

    }

    public static get() {
        return process.env.POLAR_DATA_DIR;
    }

}
