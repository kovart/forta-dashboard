export const CSS_COLOR = {
  accentPink: '#793BCA',
  accentBlue1: '#6855FA',
  accentBlue2: '#2172E5',
  accentYellow: '#F0C11A',
  accentRed: '#B91C1C',
  accentGreen: '#4B945F',
  accentOrange: '#d97706',

  neutral50: '#A7A7A7',
  neutral90: '#E9E9E9',
  neutral99: '#F5F5F5'
};

export const CssBreakpoints = {
  xsMax: () => 575,
  smStart: () => CssBreakpoints.xsMax() + 1,
  smMax: () => 768,
  mdStart: () => CssBreakpoints.smMax() + 1,
  mdMax: () => 992,
  lgStart: () => CssBreakpoints.mdMax() + 1,
  lgMax: () => 1339,
  xlStart: () => CssBreakpoints.lgMax() + 1,
  xlMax: () => 1920
};

export function getBreakpoint(windowWidth) {
  if (windowWidth <= CssBreakpoints.xsMax()) {
    return 'xs';
  } else if (windowWidth <= CssBreakpoints.smMax()) {
    return 'sm';
  } else if (windowWidth <= CssBreakpoints.mdMax()) {
    return 'md';
  } else if (windowWidth <= CssBreakpoints.lgMax()) {
    return 'lg';
  } else {
    return 'xl';
  }
}

export function normalizeResponsiveValue(value, defaultValue, payload) {
  if (typeof value === 'function') {
    return normalizeResponsiveValue(value(payload, defaultValue));
  }

  if (value != null && typeof value === 'object') {
    const responsivePropsMap = {
      xs: () => value.xs || defaultValue,
      sm: () => value.sm || responsivePropsMap.xs(),
      md: () => value.md || responsivePropsMap.sm(),
      lg: () => value.lg || responsivePropsMap.md(),
      xl: () => value.xl || responsivePropsMap.lg()
    };
    return responsivePropsMap;
  }

  value = value || defaultValue;

  return {
    xs: () => value,
    sm: () => value,
    md: () => value,
    lg: () => value,
    xl: () => value
  };
}

export function getResponsiveValue(breakpoint, valuesMap) {
  const breakpointsMap = {
    xs: () => valuesMap.xs,
    sm: () => valuesMap.sm || breakpointsMap.xs(),
    md: () => valuesMap.md || breakpointsMap.sm(),
    lg: () => valuesMap.lg || breakpointsMap.md(),
    xl: () => valuesMap.xl || breakpointsMap.lg()
  };

  return breakpointsMap[breakpoint]();
}
