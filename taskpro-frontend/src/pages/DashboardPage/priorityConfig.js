import purpleIcon from '../../assets/svg/purple.svg';
import pinkIcon from '../../assets/svg/pink.svg';
import greenIcon from '../../assets/svg/green.svg';
import greyIcon from '../../assets/svg/grey.svg';

export const PRIORITY_MAP = {
  grey:   { color: '#808080', label: 'without', icon: greyIcon   },
  green:  { color: '#BEDBB0', label: 'low',     icon: greenIcon  },
  pink:   { color: '#E8A0C0', label: 'medium',  icon: pinkIcon   },
  purple: { color: '#8B78FF', label: 'high',    icon: purpleIcon },
};

export const PRIORITY_ORDER = ['grey', 'green', 'pink', 'purple'];
