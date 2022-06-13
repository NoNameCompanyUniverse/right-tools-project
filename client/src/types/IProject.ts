import {IUser} from "./IUser";
import {IFile} from "./IFile";
import {IKanBan} from "./IKanBan";
import {IMindMap} from "./IMindMap";

export interface IProject  {
    id: number,
    name: string,
    status: {id: number, value: string},
    team: Array<IUser>,
    description: string
}

export interface IProjectFull extends IProject{
    mindmap: Array<IMindMap>,
    kanban: Array<IKanBan> ,
    file: Array<IFile>
}

