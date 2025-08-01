export interface IDeployContentProps {
    image?: string;
    link?: string;
    imageSize?: string;
}
export interface ITechIconProps {
    id?: number;
    image?: string;
    imageSize?: string;
}
export interface IBrandingProps {
    id?: number;
    image?: string;
    imageSize: string;
}
export interface IMainTitleprops {
    id?: number;
    title?: string;
}
export interface IAboutInfoProps {
    id: number;
    info: string;
    image: string;
}
export interface IMissionVisionProps {
    id?: number;
    title?: string;
    info?: string;
}
export interface ILazyFrameProps {
    id: number;
    src: string;
    h?: string;
    w?: string;
}
export interface IRenderFigmaProps {
    id: number;
    fileKey: string;
    link: string; 
}
export interface ITitleCarruselCardProps {
    id: number;
    title: string;
}

export interface IScrollListCardProps extends ITitleCarruselCardProps {
    lazyFrames: ILazyFrameProps[]; 
}
export interface IFigmaNode {
    id: string;
    name: string;
    type: string;
    children?: IFigmaNode[];
}
  
export interface IRenderFigmaProps {
    fileKey: string; 
}
export interface ILoadingProps {
    width?: string;
    height?: string;
  }
export interface ICoverDeploysProps {
    img: string;
    link?: string;
}
export interface ICoverDeployCarouselProps {
    items: ICoverDeploysProps[];
  }
export interface IDeployArticleProps {
    // id: number;
    title: string;
    text: string;
    tech: string;
    img: string;
    link: string;
}
export interface IToggleModalProps {
    toggleModal: () => void;
}