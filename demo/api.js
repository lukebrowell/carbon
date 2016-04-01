var Immutable = require('immutable');
var escapeStringRegexp = require('escape-string-regexp');

exports.countries = function(query) {
  var query = parseQueryString(query);
  var filter = query.value || query.name || "";
  var text = decodeURIComponent(filter);
  var page = Number(query.page);
  var rows = Number(query.rows);
  var skip = (page - 1) * rows;
  var regex = new RegExp(escapeStringRegexp(text), "i");

  var filteredCountries = countryList.filter(function(item) {
    return item.get('name').search(regex) > -1;
  });

  if (query.sord && query.sidx) {
    filteredCountries = filteredCountries.sort(function(a, b) {
      if (query.sord === "asc") {
        return a.get(query.sidx).localeCompare(b.get(query.sidx));
      } else {
        return b.get(query.sidx).localeCompare(a.get(query.sidx));
      }
    });
  }

  var numberOfResults = filteredCountries.count();

  var i = 0;
  filteredCountries = filteredCountries.skip(skip).takeUntil(function() {
    i++;
    return(i == (rows + 1));
  });

  return {
    rows: filteredCountries.toJS(),
    records: numberOfResults,
    current_page: page
  };
};

var parseQueryString = function( queryString ) {
  var params = {}, queries, temp, i, l;

  // Split into key/value pairs
  queries = queryString.split("&");

  // Convert the array of strings into an object
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }

  return params;
}

var countryList = Immutable.fromJS([
  {id: '1', value: 'AF', name: 'Afghanistan'},
  {id: '2', value: 'AL', name: 'Albania'},
  {id: '3', value: 'DZ', name: 'Algeria'},
  {id: '5', value: 'AD', name: 'Andorra'},
  {id: '6', value: 'AO', name: 'Angola'},
  {id: '10', value: 'AR', name: 'Argentina'},
  {id: '11', value: 'AM', name: 'Armenia'},
  {id: '12', value: 'AW', name: 'Aruba'},
  {id: '13', value: 'AU', name: 'Australia'},
  {id: '14', value: 'AT', name: 'Austria'},
  {id: '15', value: 'AZ', name: 'Azerbaijan'},
  {id: '16', value: 'BS', name: 'Bahamas'},
  {id: '17', value: 'BH', name: 'Bahrain'},
  {id: '18', value: 'BD', name: 'Bangladesh'},
  {id: '19', value: 'BB', name: 'Barbados'},
  {id: '20', value: 'BY', name: 'Belarus'},
  {id: '21', value: 'BE', name: 'Belgium'},
  {id: '22', value: 'BZ', name: 'Belize'},
  {id: '23', value: 'BJ', name: 'Benin'},
  {id: '24', value: 'BM', name: 'Bermuda'},
  {id: '25', value: 'BT', name: 'Bhutan'},
  {id: '26', value: 'BO', name: 'Bolivia'},
  {id: '27', value: 'BA', name: 'Bosnia and Herzegovina'},
  {id: '28', value: 'BW', name: 'Botswana'},
  {id: '30', value: 'BR', name: 'Brazil'},
  {id: '32', value: 'BN', name: 'Brunei Darussalam'},
  {id: '33', value: 'BG', name: 'Bulgaria'},
  {id: '34', value: 'BF', name: 'Burkina Faso'},
  {id: '35', value: 'BI', name: 'Burundi'},
  {id: '36', value: 'KH', name: 'Cambodia'},
  {id: '37', value: 'CM', name: 'Cameroon'},
  {id: '38', value: 'CA', name: 'Canada'},
  {id: '39', value: 'CV', name: 'Cape Verde'},
  {id: '40', value: 'KY', name: 'Cayman Islands'},
  {id: '41', value: 'CF', name: 'Central African Republic'},
  {id: '42', value: 'TD', name: 'Chad'},
  {id: '43', value: 'CL', name: 'Chile'},
  {id: '44', value: 'CN', name: 'China'},
  {id: '47', value: 'CO', name: 'Colombia'},
  {id: '48', value: 'KM', name: 'Comoros'},
  {id: '49', value: 'CG', name: 'Congo'},
  {id: '51', value: 'CR', name: 'Costa Rica'},
  {id: '52', value: 'HR', name: 'Croatia'},
  {id: '53', value: 'CU', name: 'Cuba'},
  {id: '54', value: 'CY', name: 'Cyprus'},
  {id: '55', value: 'CZ', name: 'Czech Republic'},
  {id: '56', value: 'DK', name: 'Denmark'},
  {id: '57', value: 'DJ', name: 'Djibouti'},
  {id: '58', value: 'DM', name: 'Dominica'},
  {id: '59', value: 'DO', name: 'Dominican Republic'},
  {id: '60', value: 'TP', name: 'East Timor'},
  {id: '61', value: 'EC', name: 'Ecuador'},
  {id: '62', value: 'EG', name: 'Egypt'},
  {id: '63', value: 'SV', name: 'El Salvador'},
  {id: '64', value: 'GQ', name: 'Equatorial Guinea'},
  {id: '65', value: 'ER', name: 'Eritrea'},
  {id: '66', value: 'EE', name: 'Estonia'},
  {id: '67', value: 'ET', name: 'Ethiopia'},
  {id: '70', value: 'FJ', name: 'Fiji'},
  {id: '71', value: 'FI', name: 'Finland'},
  {id: '72', value: 'FR', name: 'France'},
  {id: '76', value: 'GA', name: 'Gabon'},
  {id: '77', value: 'GM', name: 'Gambia'},
  {id: '78', value: 'GE', name: 'Georgia'},
  {id: '79', value: 'DE', name: 'Germany'},
  {id: '80', value: 'GH', name: 'Ghana'},
  {id: '81', value: 'GI', name: 'Gibraltar'},
  {id: '82', value: 'GR', name: 'Greece'},
  {id: '84', value: 'GD', name: 'Grenada'},
  {id: '85', value: 'GP', name: 'Guadaloupe'},
  {id: '86', value: 'GU', name: 'Guam'},
  {id: '87', value: 'GT', name: 'Guatemala'},
  {id: '88', value: 'GN', name: 'Guinea'},
  {id: '90', value: 'GY', name: 'Guyana'},
  {id: '91', value: 'HT', name: 'Haiti'},
  {id: '93', value: 'HN', name: 'Honduras'},
  {id: '94', value: 'HK', name: 'Hong Kong'},
  {id: '95', value: 'HU', name: 'Hungary'},
  {id: '96', value: 'IS', name: 'Iceland'},
  {id: '97', value: 'IN', name: 'India'},
  {id: '98', value: 'ID', name: 'Indonesia'},
  {id: '99', value: 'IR', name: 'Iran'},
  {id: '100', value: 'IQ', name: 'Iraq'},
  {id: '101', value: 'IE', name: 'Ireland'},
  {id: '102', value: 'IL', name: 'Israel'},
  {id: '103', value: 'IT', name: 'Italy'},
  {id: '104', value: 'CI', name: 'Ivory Coast'},
  {id: '105', value: 'JM', name: 'Jamaica'},
  {id: '106', value: 'JP', name: 'Japan'},
  {id: '107', value: 'JO', name: 'Jordan'},
  {id: '108', value: 'KZ', name: 'Kazakhstan'},
  {id: '109', value: 'KE', name: 'Kenya'},
  {id: '110', value: 'KP', name: 'North Korea'},
  {id: '111', value: 'KR', name: 'South Korea'},
  {id: '112', value: 'KW', name: 'Kuwait'},
  {id: '113', value: 'KG', name: 'Kyrgyzstan'},
  {id: '114', value: 'LA', name: 'Laos'},
  {id: '115', value: 'LV', name: 'Latvia'},
  {id: '116', value: 'LN', name: 'Lebanon'},
  {id: '117', value: 'LS', name: 'Lesotho'},
  {id: '118', value: 'LR', name: 'Liberia'},
  {id: '119', value: 'LY', name: 'Libya'},
  {id: '120', value: 'LI', name: 'Liechtenstein'},
  {id: '121', value: 'LT', name: 'Lithuania'},
  {id: '122', value: 'LU', name: 'Luxembourg'},
  {id: '123', value: 'MO', name: 'Macau'},
  {id: '124', value: 'MK', name: 'Macedonia'},
  {id: '125', value: 'MG', name: 'Madagascar'},
  {id: '126', value: 'MW', name: 'Malawi'},
  {id: '127', value: 'MY', name: 'Malaysia'},
  {id: '128', value: 'MV', name: 'Maldives'},
  {id: '129', value: 'ML', name: 'Mali'},
  {id: '130', value: 'MT', name: 'Malta'},
  {id: '134', value: 'MU', name: 'Mauritius'},
  {id: '136', value: 'MX', name: 'Mexico'},
  {id: '138', value: 'MD', name: 'Moldova'},
  {id: '139', value: 'MC', name: 'Monaco'},
  {id: '140', value: 'MN', name: 'Mongolia'},
  {id: '235', value: 'ME', name: 'Montenegro'},
  {id: '142', value: 'MA', name: 'Morocco'},
  {id: '143', value: 'MZ', name: 'Mozambique'},
  {id: '145', value: 'NA', name: 'Namibia'},
  {id: '147', value: 'NP', name: 'Nepal'},
  {id: '148', value: 'NL', name: 'Netherlands'},
  {id: '149', value: 'AN', name: 'Netherlands Antilles'},
  {id: '152', value: 'NZ', name: 'New Zealand'},
  {id: '153', value: 'NI', name: 'Nicaragua'},
  {id: '154', value: 'NE', name: 'Niger'},
  {id: '155', value: 'NG', name: 'Nigeria'},
  {id: '158', value: 'NO', name: 'Norway'},
  {id: '159', value: 'OM', name: 'Oman'},
  {id: '160', value: 'PK', name: 'Pakistan'},
  {id: '162', value: 'PA', name: 'Panama'},
  {id: '163', value: 'PG', name: 'Papua New Guinea'},
  {id: '164', value: 'PY', name: 'Paraguay'},
  {id: '165', value: 'PE', name: 'Peru'},
  {id: '166', value: 'PH', name: 'Philippines'},
  {id: '168', value: 'PL', name: 'Poland'},
  {id: '169', value: 'PT', name: 'Portugal'},
  {id: '170', value: 'PR', name: 'Puerto Rico'},
  {id: '171', value: 'QA', name: 'Qatar'},
  {id: '173', value: 'RO', name: 'Romania'},
  {id: '174', value: 'RU', name: 'Russia'},
  {id: '175', value: 'RW', name: 'Rwanda'},
  {id: '178', value: 'LC', name: 'St. Lucia'},
  {id: '181', value: 'WS', name: 'Samoa'},
  {id: '182', value: 'SM', name: 'San Marino'},
  {id: '183', value: 'ST', name: 'Sao Tome and Principe'},
  {id: '184', value: 'SA', name: 'Saudi Arabia'},
  {id: '234', value: 'RS', name: 'Serbia'},
  {id: '185', value: 'SN', name: 'Senegal'},
  {id: '186', value: 'SC', name: 'Seychelles'},
  {id: '187', value: 'SL', name: 'Sierra Leone'},
  {id: '188', value: 'SG', name: 'Singapore'},
  {id: '189', value: 'SK', name: 'Slovakia'},
  {id: '190', value: 'SI', name: 'Slovenia'},
  {id: '191', value: 'SB', name: 'Solomon Islands'},
  {id: '192', value: 'SO', name: 'Somalia'},
  {id: '193', value: 'ZA', name: 'South Africa'},
  {id: '194', value: 'ES', name: 'Spain'},
  {id: '195', value: 'LK', name: 'Sri Lanka'},
  {id: '196', value: 'SD', name: 'Sudan'},
  {id: '197', value: 'SR', name: 'Surinam'},
  {id: '199', value: 'SZ', name: 'Swaziland'},
  {id: '200', value: 'SE', name: 'Sweden'},
  {id: '201', value: 'CH', name: 'Switzerland'},
  {id: '202', value: 'SY', name: 'Syria'},
  {id: '203', value: 'TW', name: 'Taiwan'},
  {id: '204', value: 'TJ', name: 'Tajikistan'},
  {id: '205', value: 'TZ', name: 'Tanzania'},
  {id: '206', value: 'TH', name: 'Thailand'},
  {id: '207', value: 'TG', name: 'Togo'},
  {id: '209', value: 'TO', name: 'Tonga'},
  {id: '210', value: 'TT', name: 'Trinidad and Tobago'},
  {id: '211', value: 'TN', name: 'Tunisia'},
  {id: '212', value: 'TR', name: 'Turkey'},
  {id: '215', value: 'UG', name: 'Uganda'},
  {id: '216', value: 'UA', name: 'Ukraine'},
  {id: '217', value: 'AE', name: 'United Arab Emirates'},
  {id: '218', value: 'GB', name: 'United Kingdom'},
  {id: '219', value: 'US', name: 'United States'},
  {id: '221', value: 'UY', name: 'Uruguay'},
  {id: '222', value: 'UZ', name: 'Uzbekistan'},
  {id: '224', value: 'VE', name: 'Venezuela'},
  {id: '225', value: 'VN', name: 'Vietnam'},
  {id: '226', value: 'VI', name: 'Virgin Islands U.S.'},
  {id: '228', value: 'EH', name: 'Western Sahara'},
  {id: '229', value: 'YE', name: 'Yemen'},
  {id: '231', value: 'ZR', name: 'Zaire'},
  {id: '232', value: 'ZM', name: 'Zambia'},
  {id: '233', value: 'ZW', name: 'Zimbabwe'}
]);
