




<div align="center">

# react-native-fatos-sdk

[![Version][version-badge]][package] [![Downloads][downloads-badge]][npmtrends]
<!--[![Build Status][build-badge]][build]-->
<!--[![Code Coverage][coverage-badge]][coverage]-->

</div>

<p align="center" >
  <kbd>
    <img src="https://github.com/devfatoscorp/react-native-fatos-sdk/raw/master/assets/img1.gif" title="Scroll Demo" float="left">
  </kbd>
  <kbd>
    <img src="https://github.com/devfatoscorp/react-native-fatos-sdk/raw/master/assets/img2.gif" title="Priority Demo" float="left">
  </kbd>
  <br>
  <em>react-native-fatos-sdk example app.</em>
</p>


This is "react native fatos sdk". For more details example, please check the project in the example folder.
This is multi platform map SDK based on react native. The function of the SDK are largely composed of map, search, and route planning. The map function can control the map layer setting and the map operation function. As you type your search terms and navigation the route, the summary information will appear on the map.
To use "react-native-fatos-sdk", you must request a SDK key and then apply that key to the source. When you want an SDK key,  please go to the <http://console.fatos.biz> and request SDK key after sign up.
  
__If you are OneMap user, kindly request to  <http://onemap-console.fatos.biz>__

Please let me know if you have any technical problem using our SDK 
contact :  <dev@fatoscorp.com>
<br>

## Development environment

**Install command**

```npm i react-native-fatos-sdk```  

***

**How to register Android sdk_key**

Register key value in item sdk_key of [string.xml] file
***


**How to register iOS sdk_key**

Register key value in item sdk_key of [info.plist] file
***
**How to run example project**

**1. Create react-native project**
Move to the path where you want to create the project in the terminal 
```
react-native init "project name"
```
Create project by executing command 
Go to project path from terminal  

```
npm i react-native-fatos-sdk (Install sdk in project example)"
```
Install react-native-fatos-sdk with command
Execute two commands 
```
npm install 
yarn install
```
with project name/node_modules/react-native-fatos-sdk/example path 

**2. How to set up android example project**

Go to project name/node_modules/react-native-fatos-sdk/example  path and open android project in example name folder with android studio
Press the 'Refactor'(top of android studio menu) -> 'Migrate to AndroidX'. Then, Migrate the UI library used in the project to AndroidX-based 
If build error occurs after migration, AndroidX must be manually applied 

<p align="center" >
  <kbd>
    <img src="https://github.com/devfatoscorp/react-native-fatos-sdk/raw/master/assets/img3.png" title="Scroll Demo" float="left">
  </kbd>
</p>

**3. How to set up and ios example project**

In terminal, go to the path where the ios project is installed in the project name/node_modules/react-native-fatos-sdk/example folder
```
rm -rf "${HOME}/Library/Caches/CocoaPods"
rm -rf "pwd/Pods/"
pod update
```
Enter commands in order 
***
**4. How to set up a terminal project execution command**
Go to example from the terminal  
```
react-native run-ios
react-native run-android
```
Each is a platform-specific project execution command



## SDK interface description

**1. Structure description of react native ui**
FatosMainView.js is the top-level main view. It is rendered in the order in which it is registered in the function render(). function are rendered in the order in which they are registered. Unnecessary views can be unregistered. You can unregister unnecessary views.

```

render() {

	 return (
		<View style={styles.container}>
			{mapView}                // Map view
			{firstTbTView}           // TBT view
			{secondTbTView}          // TBT view
			{speedoMeterView}        // Speed view
			{RGView}                 // Map control view
			{SDIView}                // SDI view
			{bottomView}             // Bottom view
			{laneView}               // Lane information
			{searchView}             // Search view
			{searchListView}         // Search list view
			{routeSummaryView}       // Route summary view
			{summarySearchView}      // Route summary search view
			{summarySearchListView}  // Route summary search list view
			{webView}                // Web view
			{indicator}              // loading view
		</View>
	)
}
```


**2. FatosEnvBridgeModule(Settings related)**
```
1. Language settings
FatosEnvBridgeModule.SetLanguage(int) (int)FatosEnvBridgeModule.GetLanguage
0 KOREAN, 1 ENGLISH

2. Route line color
FatosEnvBridgeModule.SetPathLineColor(int)  (int)FatosEnvBridgeModule.GetPathLineColor
0 : Red, 1 : Blue, 2 : Green, 3 : Purple

3. Basic Route search option
FatosEnvBridgeModule.SetNavigationOptions(array(bool))
(JSON array)FatosEnvBridgeModule.GetNavigationOptions
0 : Recommended, 1 : Expressway priority, 2 : Avoid toll roads, 3 : Free road first, 4 : Shortest route

4. Map color
FatosEnvBridgeModule.SetMapColor(int)
(int)FatosEnvBridgeModule.GetMapColor
0 day, 1 night, 2 auto

5. Smart driving mode
FatosEnvBridgeModule.SetSmartDrivingMode(bool)
(bool)FatosEnvBridgeModule.GetSmartDrivingMode
true : On, false : Off

6. Camera guidance options
FatosEnvBridgeModule.SetCamreaOptions(array(bool)
(JSON array)FatosEnvBridgeModule.GetCamreaOptions
0 : Fixed camera, 1 : Mobile camera, 2 : Signal control section, 3 : Intervention control, 4 : Parking control, 5 : Bus lane

7. Caution section guidance options
FatosEnvBridgeModule.SetOperationState(array(bool))
(JSON array)FatosEnvBridgeModule.GetOperationState
0 : Sharp curve, 1 : Child protection zone, 2 : Accident hazard

8. Facility guidance options
FatosEnvBridgeModule.SetFacility(array(bool))
(JSON array)FatosEnvBridgeModule.GetFacility
0 : Traffic information collection

9. A guiding voice
FatosEnvBridgeModule.SetGuidevoice(int)
(int)FatosEnvBridgeModule.GetGuidevoice
0 : Detail(TTS) , 1 : Simple(Basic)

10. Cyclic rescan
FatosEnvBridgeModule.SetRediscover(int)
(int)FatosEnvBridgeModule.GetRediscover
0 : 5min, 1 : 10min

11. Waypoint direction
FatosEnvBridgeModule.SetWayPoint(int)
(int)FatosEnvBridgeModule GetWayPoint
0 : Use, 1 : Not use

12. Hi-pass
FatosEnvBridgeModule.SetHiPass(bool)
(String)FatosEnvBridgeModule.GetHiPass
true : On, false : Off

13. Vehicle type
FatosEnvBridgeModule.SetCarType(int)
(int)FatosEnvBridgeModule.GetCarType
0 : compact car, 1 : passenger car, 2 : SUV, 3 : MPV, 4 : Truck, 5 : Special freight vehicle

14. Fuel type
FatosEnvBridgeModule.SetFuel(int)
(int)FatosEnvBridgeModule.GetFuel
0 : Gasoline, 2 : diesel, 3 : LPG

15. Driver position option
FatosEnvBridgeModule.SetSeatPosition(int)
(int)FatosEnvBridgeModule.GetSeatPosition
0 : Left, 1 : Right

16. Current location lcon (cavata)
FatosEnvBridgeModule.SetCarvata(int)
(int)FatosEnvBridgeModule.GetCarvata
0 : White background, 1 : Blue background, 2 : Red arrow, 3 : Blue arrow
```

**3. FatosMapViewBridgeModule(Map function related)**
```
1. Initialization function
In the “App.js” constructor, it requires initialization to “1” for the first time.
FatosMapViewBridgeModule.setListener(String)

2. Change view mode
FatosMapViewBridgeModule. setViewMode (int)
0 : MAP_VIEW_MODE_BIRD, 1 : MAP_VIEW_MODE_NORTHUP, 2: MAP_VIEW_MODE_HEADING

3. Change layer
FatosMapViewBridgeModule.setLayer(baseLayerType(map), bVisible(map))

Example of parameters

baseLayerType = {
	0: BASEMAP_LAYER_AEROPHOTO,
	1: BASEMAP_LAYER_BUILDING,
	2: BASEMAP_LAYER_POI,
	3: BASEMAP_LAYER_ROAD,
	4: BASEMAP_LAYER_SATELLITE
};

bVisible = {

	0: "false",
	1: "true",
	2: "true",
	3: "true",
	4: "false",

};

4. Map zoom-in
FatosMapViewBridgeModule.MapLevelIn()

5. Map zoom-out
FatosMapViewBridgeModule.OnMapLevelOut()

6. Move to current location
FatosMapViewBridgeModule.OnMapAuto()

7. Change Route summary view
Change the map view based on the line color(3 three), map scale and center value to be displayed in the route summary.
FatosMapViewBridgeModule.SummaryMapSetting(lineColor(map), xScale(float), yScale(float), hCenter(float), vCenter(float))

Example of lineColor parameter
Register rgba value separated by commas(,)
lineColor = {
	0: '' + 255 + ',' + 108 + ',' + 108 + ',' + 255,
	1: '' + 21 + ',' + 181 + ',' + 36 + ',' + 255,
	2: '' + 2 + ',' + 228 + ',' + 193 + ',' + 255,
};

8. Change basic(driving) map view
FatosMapViewBridgeModule.DefaultMapSetting()

9. Display the selected route on the route summary view
FatosMapViewBridgeModule.SelectRouteLine(index(int))

10. Select route to drive
FatosMapViewBridgeModule.ApplySelectRouteLine(index(int))

11. Map level update listener
Delivery the level when the map level changes
FatosMapViewBridgeModule.MapLevelUpdateListener(int)

12. administrative name of map current location update listener
Delivery administrative name of map center location
FatosMapViewBridgeModule.PosWorldLocationUpdateListener (String)

13. Map view touch status update listener
Delivery map view touch status change
FatosMapViewBridgeModule.TouchMoveModeListener (int)
	0 : Current location, 1 : On the move, 2 : Transfer completed
```

**4. FatosNaviBridgeModule(Navigation related)**
```
1. Initialization function
In the “App.js” constructor, it requires initialization to “1” for the first time.
FatosNaviBridgeModule.setListener(String)

2 Search
FatosNaviBridgeModule.Search(searchText(String), flag(int))
Use search flag as 1

3. Search result listener
FatosNaviBridgeModule.SearchResultListener (JSON)		{

{

	pgno : “page number”,
	cnt : “number of searches”
	items : [

			 {

				"id" : "POI ID",
				"addr1" : "POI Display name",
				"addr2" : "New address(the road name address)",
				"phone" : Phone number(separators comma(,))",
				"cate" : "Classification code",
				"posx" : "POI X coordinates",
				"posy" : "POI Y coordinates",
				"entx" : “POI point of entry X coordinates",
				"enty" : "POI point of entry Y coordinates",
				"dist" : "distance"

			 }

		]

}


4. Request route planning
FatosNaviBridgeModule.Route(startLat(String), startLon(String), goalLat(String), goalLon(String))
If the start point coordinates(startLat, startLon)are set to 0, the current location is automatically set.

5. Request rescan
FatosNaviBridgeModule.Rescan()

6. Route request completed listener
FatosNaviBridgeModule.RouteResultListener(int)
0 : initial search, 1 : Rescan, 2 : Cyclic rescan

7. Cancel the route
FatosNaviBridgeModule.CancelRoute()

8. Start simulated driving
FatosNaviBridgeModule.StartSimulation()

9. Control simulated driving
FatosNaviBridgeModule.DriveControl(int)
0 : Pause, 1 : Restart

10. Simulated driving speed(km/h)
FatosNaviBridgeModule.DriveSpeed(int)

11. End of simulated driving
FatosNaviBridgeModule.DriveClose()

12. Start route guidance
FatosNaviBridgeModule.StartRouteGuidance(index(int))
index selected in route summary

13. Start of simulated driving
FatosNaviBridgeModule.StartSimulation(index(int)
Use index set in FatosMapViewBridgeModule.ApplySelectRouteLine

14. Route summary information
(JSON)FatosNaviBridgeModule.GetRouteSummaryJson()

{
contexts : [
		{

			"Type" : "(int)Route planning option",
			"Length" : "(String)Total distance",
			"Time" : "(int)Total time",
			"Fee" : "(int) Charge information,
			"AvgSpeed" :"(int) section average speed",
			"TurnCongestion" : "(int) section congestion"

		}

	]

}


15. RG(Driving/Simulated) Date update listener
Send once per second
FatosNaviBridgeModule.UpdateRGListener ((JSON))

{

"MMStatus" : "(int)GPS information",
"CarSpeed" : "(int) speed",
"LocationText" : "(String)location information",
"X" : "(double) location coordinates x",
"Y" : "(double) location coordinates y",
"Angle" : "(float) angle",
"FirstTbTShow" : "(Bool)First TBT exposure",
"SecondTbTShow" : "(Bool)Second TbT exposure,
"SdiShow" : "(Bool)Sdi exposure",
"DriveMode" : "(int) Driving condition",

// If you have route
"CurDist" : "(String)current guidance remaining distance",
"CurType" : "(int)current guidance type",
"NextDist" : "(String) next guide remaining distance",
"NextType" : "(int) next guide type",
"StringText" : "(String) current guidance explanation",
"RemainDistance" : "(String) Remaining distance",
"RemainTime" : "(String) Remaining time",

// If you have sdi information
"ListSDIService" : [
	{
			"Type" : "(int)sdi type",
			"X" : "(int)sdi location coordinates x",
			"Y" : "(int)sdi location coordinates y",
			"Angle" : "(int)sdi angle",
			"MaxSpeed" : "(int) maximum speed limit",
			"SectionDist" : "(int) Total distance of interruption",
			"RemainDist" : "(String)sdi Remaining distance",
			"Weight" : "(int) Weight information about truck",
			"Height" : "(int) Height information about truck"
	}
],

// If you have lane information
"LaneInfo" : {
	"Dist" : "(int)Distance to the lane ",
	"DrawableList" : [
			{
				"Drawable" : "(String) information of lane ui",
				"CoverDrawable" : "(String) information of lane cover ui"
			}
		]
	}
}

16. ShowIndicator Listener
Delivering to show loading UI during Route planning and search
FatosNaviBridgeModule.ShowIndicatorListener()

17. HideIndicator Listener
Delivering to hide loading UI during Route planning and search
FatosNaviBridgeModule.HideIndicatorListener()

18. App permission completed Listener
Passes whether or not to acquire the privilege so that the UI can be seen after acquiring the app right.
FatosNaviBridgeModule.PermissionCompleteListene()
```


[version-badge]: https://img.shields.io/npm/v/react-native-fatos-sdk.svg?color=blue&logoColor=blue&style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/react-native-fatos-sdk.svg?style=flat-square
<!--[build-badge]: https://img.shields.io/cirrus/github/devfatoscorp/react-native-fatos-sdk.svg?style=flat-square-->
<!--[coverage-badge]: https://img.shields.io/codecov/c/github/dylanvann/react-native-fast-image.svg?style=flat-square-->

[package]: https://www.npmjs.com/package/react-native-fatos-sdk
[npmtrends]: https://www.npmjs.com/package/react-native-fatos-sdk
[build]: https://www.npmjs.com/package/react-native-fatos-sdk
[coverage]: https://www.npmjs.com/package/react-native-fatos-sdk






