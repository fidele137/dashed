export function borderImageSource(dashWidth, dashLength, dashSpacing, borderRadius) {
  // prettier-ignore
  return `url("data:image/svg+xml;utf8,
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='${dashSpacing + dashLength + 2*dashWidth + 2*borderRadius}'
      height='${dashSpacing + dashLength + 2*dashWidth + 2*borderRadius}'
      viewBox='0 0 ${dashSpacing + dashLength + 2*dashWidth + 2*borderRadius} ${dashSpacing + dashLength + 2*dashWidth + 2*borderRadius}'
      stroke-width='${dashWidth}'
      stroke='blue'>
        <path
          stroke-width='${dashWidth}'
          d='M${dashWidth + borderRadius + dashSpacing/2} ${dashWidth/2}h${dashLength}m${dashSpacing/2 + borderRadius + dashWidth/2} ${dashWidth/2 + borderRadius + dashSpacing/2}v${dashLength}m${-dashWidth/2 - borderRadius -dashSpacing/2} ${dashSpacing/2 + borderRadius + dashWidth/2}h${-dashLength}m${-dashSpacing/2 - borderRadius - dashWidth/2} ${-dashWidth/2 - borderRadius - dashSpacing/2}v${-dashLength}'/>

        ${borderRadius > 0
          ? `<path
              fill='none'
              d='M${dashWidth/2} ${dashWidth + borderRadius - dashSpacing/2}a${borderRadius} ${borderRadius} 0 0 1 ${dashWidth/2 + borderRadius - dashSpacing/2} ${-borderRadius - dashWidth/2 + dashSpacing/2}m${dashLength + 2 * dashSpacing} 0a${borderRadius} ${borderRadius} 0 0 1 ${borderRadius + dashWidth/2 - dashSpacing/2} ${dashWidth/2 + borderRadius - dashSpacing/2}m0 ${dashLength + 2*dashSpacing}a${borderRadius} ${borderRadius} 0 0 1 ${-dashWidth/2 - borderRadius + dashSpacing/2} ${borderRadius + dashWidth/2 - dashSpacing/2}m${-dashLength - 2* dashSpacing} 0a${borderRadius} ${borderRadius} 0 0 1 ${-borderRadius - dashWidth/2 + dashSpacing/2} ${-dashWidth/2 - borderRadius + dashSpacing/2}'/>`
          : ''}
    </svg>")`.replace(/\n|\t/gm, '');
}
