import { CursorStyle, SpaceStyle } from '@/types/settings.types';

export const getCursorStyling = (cursorStyle: CursorStyle) => {
  return {
    [CursorStyle.BOX]: '',
    [CursorStyle.LINE]: 'border-r-transparent border-y-transparent',
    [CursorStyle.UNDERLINE]: 'border-x-transparent border-t-transparent',
  }[cursorStyle];
};

export const getSpaceStyling = (spaceStyle: SpaceStyle) => {
  return {
    [SpaceStyle.DOT]:
      'size-[5px] lg:size-[6px] xl:size-[7px] rounded-full m-auto',
    [SpaceStyle.DASH]: 'h-[2px] w-[7px] lg:w-[9px] xl:w-[10px] mt-auto mx-auto',
    [SpaceStyle.EMPTY]: 'bg-transparent',
  }[spaceStyle];
};
