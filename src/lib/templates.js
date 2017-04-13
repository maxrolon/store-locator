import {
  toTitleCase,
  formatNumber,
} from './utils'

export const SIDEBAR_TEMPLATE = ( { name, street, city, state, zip, phone, lat, lng, distance, carries } ) => {
  return `
    <div class="locate__location--sidebar">
      <p class="h6 c-gold mta">${name}</p>
      <p class="p mxa">${toTitleCase( street )}</p>
      <p class="p mxa">${toTitleCase( city )}, ${state} ${zip}</p>
      <a class="block p mxa c-gold-darker hover--gold" href="tel:${phone}">${formatNumber( phone )}</a>
      <p class="p mxa mb1">
          <a class="block mxa c-gold-darker hover--gold locate__directions--sidebar" href="https://www.google.com/maps/dir//${lat},${lng}" target="_blank">Get Directions</a>
          <a class="block mxa c-gold-darker icon-text-star js-show-marker hover--gold" href="#">View on Map</a>
      </p>
      <p class="p mxa"><span class="medium">Distance: </span>${distance} miles</p>
      <p class="p mxa"><span class="medium">Carries: </span>${carries}</p>
    </div>`
}

export const MARKER_TEMPLATE = ( { name, street, city, state, zip, phone, lat, lng, distance, carries } ) => {
  return `
  <div class="locate__location--marker">
      <p class="h6 c-gold mta">${name}</p>
      <p class="p mxa">${toTitleCase( street )}</p>
      <p class="p mxa">${toTitleCase( city )}, ${state} ${zip}</p>
      <a class="block p mxa c-gold hover--gold" href="tel:${phone}">${formatNumber( phone )}</a>
      <a class="block p mxa mb1 c-gold hover--gold locate__directions" href="https://www.google.com/maps/dir//${lat},${lng}" target="_blank">Get Directions</a>
      <p class="p mxa"><span class="medium archer">Distance: </span>${distance} miles</p>
      <p class="p mxa"><span class="medium archer">Carries: </span>${carries}</p>
    </div>`
}
