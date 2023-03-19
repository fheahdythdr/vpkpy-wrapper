import { results } from '../lib/interface';

declare namespace vpkpy {
    declare function exec(str: string, cb: function): void;
    declare function create(file: string, opts: string): string;
    declare function createVersion(file: string, ver: string, opts: string): string;
    declare function createAndMove(file: string, ver: string, move: string, opts: string): void;
    declare function extract(file: string, out: string, opts: string): void;
    declare function test(file: string): Promise<results>;
    declare function list(file: string): Promise<results>;
    declare function listStats(file: string): Promise<results>;
}

export = vpkpy
