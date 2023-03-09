# Points which surround each region.
# If no points are defined, the shapefile will be used
regions = {
    # https://www.eea.europa.eu/data-and-maps/indicators/global-and-european-temperature-10
    "EU": {
        "full_name": "European Union",
        "points": [(34, -25), (72, 45), (72, -25), (32, 45)],
        # TODO: Consider switching to just country border data
        "box": [-25, 34, 32, 72],
    },
    "US": {
        "full_name": "USA",
    },
    "China": {
        "full_name": "China",
    },
    "SA": {
        "full_name": "South American Amazonian Countries",
        "country_names": ["Brazil", "Colombia", "Bolivia", "Peru", "Ecuador", "Venezuela", "Suriname", "Guyana"],
        # TODO: last two are duplicated
    },
    "India": {
        "full_name": "India"
    },
    "Island": {
        "full_name": "Alliance of Small Island States",
        # Based on scale of data
        "country_names": ["The Bahamas", "Belize", "Cuba", "Dominican Republic", "Guyana", "Haiti", "Jamaica",
                          "Suriname", "Trinidad and Tobago", "Fiji", "Papua New Guinea", "Solomon Islands", "Vanuatu"],
        "country_names_actual": ["Cape Verde", "Guinea-Bissau", "Sao Tome and Principe", "Antigua and Barbuda",
                                 "Bahamas","Barbados", "Belize", "Cuba", "Dominica", "Dominican Republic", "Grenada",
                                 "Guyana", "Haiti", "Jamaica", "Saint Kitts and Nevis", "Saint Lucia",
                                 "Saint Vincent and the Grenadines", "Suriname", "Trinidad and Tobago", "Comoros",
                                 "Maldives", "Seychelles", "Mauritius", "Cook Islands","Fiji", "Kiribati",
                                 "Marshall Islands", "Micronesia, Federated States of", "Nauru","Niue", "Palau",
                                 "Papua New Guinea", "Samoa", "Solomon Islands", "Timor-Leste", "Tonga", "Tuvalu",
                                 "Vanuatu", "Singapore"],
    },  # https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}
