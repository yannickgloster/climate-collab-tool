# Points which surround each region.
# TODO: Get region boundaries for each country.
# Use this: https://is-enes-data.github.io/cordex_archive_specifications.pdf
# Look into : https://sandbox.zenodo.org/record/870510
regions = {
    # https://www.eea.europa.eu/data-and-maps/indicators/global-and-european-temperature-10
    "EU": {
        "full_name": "European Union",
        "points": [[(34, -25), (72, 45), (72, -25), (32, 45)]],
    },
    # From Topologically Integrated Geographic Encoding and Referencing system (TIGER) data, produced by the US Census Bureau
    # http://www2.census.gov/geo/tiger/TIGER2010/STATE/2010/tl_2010_us_state10.zip
    # https://qr.ae/pr4ZJK
    "US": {
        "full_name": "United States",
        # (lat, lon)
        "points": [
            [
                (-124.848974, 24.396308),
                (-66.885444, 49.384358),
                (-124.848974, 49.384358),
                (-66.885444, 24.396308),
            ]
        ],
    },
    # https://stackoverflow.com/questions/69478644/how-to-find-bounding-box-data-for-all-regions-in-the-world
    "China": {
        "full_name": "China",
        "points": [],  # (25.0671341, -99.4612273)
    },
    "SA": {
        "full_name": "South American Amazonian Countries",
        "points": [],
    },  # Brazil, Columbia, Bolivia, Peru, Ecuador, Venezuela, Suriname, Guyana)
    "India": {"full_name": "India", "points": []},
    "Island": {
        "full_name": "Alliance of Small Island States",
        "points": [],
    },  # https://en.wikipedia.org/wiki/Alliance_of_Small_Island_States
}
