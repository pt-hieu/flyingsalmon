/**
 * Safari fires no `scrollend`, so a scroll that stops without one is treated as
 * at rest this long after the last `scroll` event. Long enough that a trackpad
 * flick's deceleration does not read as several rests, short enough that the
 * dots and the buttons follow a finger lifting off the screen.
 */
export const carouselScrollRestInterval = 120
