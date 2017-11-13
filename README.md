JumboMap Stores View App Readme

1) Installation:
  1. Put  jumbomap.war into tomcat server webapps folder
  2. Start tomcat
  3. In browser open page http://localhost:8080/jumbomap/

2) Settings

Settings file: googlemap-target.properties

# Settings are following:
googlemap.show.items = 5                           # initial number of items
googlemap.items.file = scripts/stores.json         # data file
googlemap.address=Rotterdam                        # initial address
googlemap.geoGoogleMapKey=AIzaSyDVhcygUZzCnweIuK51ZTeZMCWBG7U5hzc                     # Google API KEY
googlemap.geoGoogleMapUrl=https://maps.googleapis.com/maps/api/js?libraries=geometry  #Google API URL
