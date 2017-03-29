var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

var map = L.map('map', {
    zoom: 16,
    fullscreenControl: true,
    zoomControl:false,
    scrollWheelZoom: false,
    touchZoom: false,
    dragging:false,
    doubleClickZoom: false,
    center: [41.13887977402061, -111.82219505310059]
});

// start of TimeDimension manual instantiation
var timeDimension = new L.TimeDimension({
        period: "PT48H"
    });
// helper to share the timeDimension object between all layers
map.timeDimension = timeDimension; 
// otherwise you have to set the 'timeDimension' option on all layers.

var player        = new L.TimeDimension.Player({
    transitionTime: 25, 
    loop: false,
    startOver:true
}, timeDimension);

var timeDimensionControlOptions = {
    player:        player,
	displayDate: false,
	loopButton: true,
    timeDimension: timeDimension,
    position:      'bottomleft',
    autoPlay:      true,
    minSpeed:      1,
    speedStep:     1,
    maxSpeed:      60,
    timeSliderDragUpdate: true
};
var customControl =  L.Control.extend({

    options: {
        position: 'bottomleft'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.id= 'dateDisp'
        container.style.backgroundColor = 'white';
        container.style.position = 'relative';
        container.style.width = '150px'
        container.style.margin = '10 auto';
        //container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
        // container.style.backgroundSize = "30px 30px";
        // container.style.width = '30px';
        // container.style.height = '30px';
        return container;
    }
});
var customControl2 =  L.Control.extend({

    options: {
        position: 'bottomright'
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div');
        container.id = 'distancesDisplay';
        container.style.position = 'relative';
        container.style.width = "150px";
        container.style.margin = '10 auto';
        container.innerHTML = '<div id = "dist1" class = "dist"></div><div id ="dist2" class = "dist"></div><div id="dist3" class = "dist"></div><div id = "dist4" class = "dist"></div><div id = "dist5" class = "dist"></div>';
        // console.log(container);
        return container;
    }
});

var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
map.addControl(timeDimensionControl);

var elk_icon = L.icon({
    iconUrl: 'img/elk.png',
    iconSize: [30,30]

});
var deer_icon = L.icon({
    iconUrl: 'img/deer.png',
    iconSize: [38, 38]
});
var trout_icon = L.icon({
    iconUrl: 'img/trout3.png',
    iconSize: [75, 75]
});
// var myIcon = L.icon({
//     iconUrl: 'leaflet/images/marker-icon.png',
//     iconSize: [10,10],
//     iconAnchor: [22, 94],
//     popupAnchor: [-3, -76],
//     shadowUrl: 'leaflet/images/marker-shadow.png',
//     shadowSize: [68, 95],
//     shadowAnchor: [22, 94]
// });
var customLayer = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:trout_icon});
            // return null;
        }
        return L.Marker(latLng);
        // return null;
    },
    style: {color: '#7d00ff',weight:7.5}
});
var customLayer2 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:trout_icon});
        }
        return L.circleMarker(latLng);
    },
    style: {color: '#FF1493', weight:3.5}
});
// function parseFeatures(feature){
//     if (feature.properties.hasOwnProperty('last')) {
//         // console.log(feature);
//         // console.log(feature.geometry.coordinates);
//         // console.log("fire");
//         // coord.push(feature.geometry.coordinates[1]);
//         // coord.push(feature.geometry.coordinates[0]);
//         var latlng = L.latLng(feature.geometry.coordinates[1],feature.geometry.coordinates[0]);
//         // console.log(latlng);
//         L.esri.identifyFeatures({
//             url: '//tlamap.trustlands.utah.gov/arcgis/rest/services/UT_SITLA_LandOwnership/MapServer'})
//             .on(map).at(latlng).run(function(error, featureCollection){
//            if (featureCollection.features.length > 0) {
//           console.log(featureCollection.features[0].properties['STATE OF UTAH LEGEND']);
//       }
//       else {
//        // console.log( 'No features identified.');
//       }
//
//   });
//         }
//     // ref.identify()
//     //       .at(feature.properties.lat)
//     //       .run(function(error, featureCollection){
//     //         console.log(featureCollection);
//     //       });
// }
var customLayer3 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:trout_icon});
        }
        return L.circleMarker(latLng);
    },
    style: {color: '#FF1493', weight:3.5}
});
var customLayer3_full = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:elk_icon});
        }
        return L.circleMarker(latLng, {icon:elk_icon});

    },
    style: function (feature) {
        switch(feature.properties.name) {
            case "1":
                return {color: '#01a9b2', weight: 2, opacity: 1};
            case "2":
                return {color: '#b1f4fc', weight: 2, opacity: 1};
            case "3":
                return {color: '#EB7618', weight: 2, opacity: 1};
            case "4":
                return {color: '#3bbc89', weight: 2, opacity: 1};
            case "5":
                return {color: '#f099ca', weight: 2, opacity: 1};
             case "6":
                return {color: '#f73e6b', weight: 2, opacity: 1};
            case "7":
                return {color: '#ca8bd1', weight: 2, opacity: 1};
            case "8":
                return {color: '#d6343b', weight: 2, opacity: 1};
            case "9":
                return {color: '#1730c6', weight: 2, opacity: 1};
            case "10":
                return {color: '#d859e0', weight: 2, opacity: 1};
             case "11":
                return {color: '#ca05e3', weight: 2, opacity: 1};
            case "12":
                return {color: '#654b8e', weight: 2, opacity: 1};
            case "13":
                return {color: '#3782c1', weight: 2, opacity: 1};
            case "14":
                return {color: '#b38623', weight: 2, opacity: 1};
        }
    }
});
var customLayer4 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:trout_icon});
        }
        return L.circleMarker(latLng);
    },
    style: {color: '#ff3f5a', weight:5.5}
});
var customLayer5 = L.geoJson(null, {
    pointToLayer: function (feature, latLng) {
        if (feature.properties.hasOwnProperty('last')) {
            return new L.Marker(latLng, {icon:trout_icon});
        }
        return L.circleMarker(latLng);
    },
    style: {color: '#ff5700', weight:7.5}

});
var gpxLayer = omnivore.gpx('data/fish1.gpx', null, customLayer);
var gpxLayerFish5 = omnivore.gpx('data/fish5.gpx', null, customLayer5);
var gpxTimeLayerFish1 = L.timeDimension.layer.geoJson(gpxLayer, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true
});
var gpxLayer2 = omnivore.gpx('data/fish2.gpx', null, customLayer2);

var gpxTimeLayerFish2 = L.timeDimension.layer.geoJson(gpxLayer2, {
    updateTimeDimension: true,
    addlastPoint: false,
    waitForReady: true,
    duration:"P4M",
    updateTimeDimensionMode: 'union'
});
var gpxTimeLayerFish5 = L.timeDimension.layer.geoJson(gpxLayerFish5, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true,
    updateTimeDimensionMode: 'union'
});
var gpxLayer3 = omnivore.gpx('data/fish2.gpx', null, customLayer3);
// var gpxLayer3_full = omnivore.gpx('data/Elk_WasatchCurrantCreek.gpx', null, customLayer3_full);
var gpxLayer4 = omnivore.gpx('data/fish3.gpx', null, customLayer4);
// var group = new L.featureGroup([gpxLayer, gpxLayer2, gpxLayer3, gpxLayer4]);
// var gpxLayer4_full = omnivore.gpx('data/deer3.gpx', null, customLayer4).on('ready', function() {
//     // map.fitBounds(group.getBounds(), {
//     //     paddingBottomRight: [40, 40]
//     // });
// });
//
// // map.fitBounds(group.getBounds());
//
var gpxTimeLayer3 = L.timeDimension.layer.geoJson(gpxLayer3, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true,
    updateTimeDimensionMode: 'union'
});
// var gpxTimeLayer3_full = L.timeDimension.layer.geoJson(gpxLayer3_full, {
//     updateTimeDimension: true,
//     addlastPoint: true,
//     waitForReady: true
// });
var gpxTimeLayerFish3 = L.timeDimension.layer.geoJson(gpxLayer4, {
    updateTimeDimension: true,
    addlastPoint: true,
    waitForReady: true,
    updateTimeDimensionMode: 'union'
});
// var gpxTimeLayer4_full = L.timeDimension.layer.geoJson(gpxLayer4_full, {
//     updateTimeDimension: true,
//     addlastPoint: true,
//     waitForReady: true
// });
var barriers = L.esri.featureLayer({
  url: '//services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/MigrationLegacyInitiative_WeberRiver_Background/FeatureServer/0'}).addTo(map);
var antennas= L.esri.featureLayer({
  url: '//services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/MigrationLegacyInitiative_WeberRiver_Background/FeatureServer/1'
}).addTo(map);
var historic_dist= L.esri.featureLayer({
  url: '//services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/MigrationLegacyInitiative_WeberRiver_Background/FeatureServer/2'
}).addTo(map);
var huc10 = L.esri.featureLayer({
  url: '//services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/MigrationLegacyInitiative_WeberRiver_Background/FeatureServer/3'
}).addTo(map);

var picIcon1_first = L.icon({
    iconUrl: 'https://preview.ibb.co/eM5jgF/Strawberry_culvert_barrier.jpg',
    iconSize:     [400, 300]
});
var picIcon1_second = L.icon({
    iconUrl: 'https://preview.ibb.co/hLFBTv/Strawberry_culvert_barrier_with_fish_passage.jpg',
    iconSize:     [400, 300]
});
var picIcon2 = L.icon({
    iconUrl: 'https://preview.ibb.co/ijPo8v/Dalton_Creek.jpg',
    iconSize:     [400, 300]
});
var picIcon3 = L.icon({
    iconUrl: 'https://preview.ibb.co/hLFBTv/Strawberry_culvert_barrier_with_fish_passage.jpg',
    iconSize:     [500, 400]
});

var pics = L.marker([41.14309743510025, -111.83427572250368], {icon: picIcon1_first}).addTo(map);
var pics2 = L.marker([41.13968777607338, -111.80756092071533],{icon: picIcon2});
var pics3 = L.marker([41.142176359852755,-111.82206630706789],{icon:picIcon3});
var leader1 = L.polyline([[41.143113594199654,-111.83468341827394],[41.138018,-111.827273]],{color: 'black', weight:3}).addTo(map);
var leader2 = L.polyline([[41.13968777607338, -111.80756092071533],[41.135158, -111.817404]],{color: 'black', weight:3});

var popup = L.popup({
    keepInView: true,
    autoPan: true,
    closeButton: true,
    closeOnClick: true
}).setContent('<iframe width="560" height="315" src="https://www.youtube.com/embed/Nh9BZ0DiAic?autoplay=1" frameborder="0" allowfullscreen></iframe>');
pics.bindPopup(popup);

barriers.bindPopup(function (layer) {
    console.log(layer.feature);
    if (layer.feature.properties.Pic != null && layer.feature.properties.Pic2 != null){

    return L.Util.template('<b>Barrier Location - {BarName}<br><br>{Comments}</b><br><br><table style="width:100%; border-spacing: 15px;"><tr><td><a href="{Pic2}" target = "_blank"><img src="{Pic2}" alt="Open Dam" ></a></td><td><a href="{Pic}" target = "_blank"><img src="{Pic}" alt="Open Dam"></a></td></tr></table>', layer.feature.properties);
  }
  else if (layer.feature.properties.Pic != null){
        return L.Util.template('<p><b>Barrier Location - {BarName}<br><br>{Comments}</b><br><br><a href="{Pic}" target = "_blank"><img src="{Pic}" alt="Open Dam" "></a></p>', layer.feature.properties);
    }
     else if (layer.feature.properties.Pic2 != null){
        return L.Util.template('<p><b>Barrier Location - {BarName}<br><br>{Comments}</b><br><br><a href="{Pic2}" target = "_blank"><img src="{Pic2}" alt="Open Dam"></a></p>', layer.feature.properties);
    }
  else {
         return L.Util.template('<p><b>Barrier Location - {BarName}<br><br>{Comments}</b>', layer.feature.properties);
    }
});


antennas.bindPopup(function(layer){
    return L.Util.template('<p><b>Antenna Location </b></p>', layer.feature.properties);
});
function getColor(d) {
    return d == 'Bureau of Land Management' ? '#FEE67A' :
           d == 'National Forest'  ? '#88CE66' :
           d == 'Private'  ? '#FFFFFF' :
           d == 'State Wildlife Reserve/Management Area'  ? '#C2B88E' :
           d == 'State Trust Lands'   ? '#74B3FF' :
           d == 'Other State'   ? '#C2B88E' :
           d == 'Tribal Lands'   ? '#FDB56B' :
           d == 'National Parks, Monuments & Historic Sites' ?  '#CAA6DF' :
           d =='#FFEDA0';
}

 var legend = L.control({position: 'bottomright'});
var legend2 = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Bureau of Land Management", "National Forest", 'National Parks, Monuments & Historic Sites','State Trust Lands', 'State Wildlife Reserve/Management Area', 'Tribal Lands','Private'];
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Symbols</b> <!--Padding is optional--> </span></div>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/deer.png" +" height='25' width='25'>")+"</i>" +' Mule Deer' + '<br>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/elk.png" +" height='25' width='25'>")+"</i>" +' Elk' ;
    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Land Ownership</b> <!--Padding is optional--> </span></div>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            (grades[i] ? grades[i] + '<br>' : '+');
    }

    return div;
};
legend2.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

    div.innerHTML += '<div style="width: 100%;margin-bottom:10px; border-bottom: 1px solid black; text-align: center" > <span style="font-size: 15px; margin: 6px;"><b>Symbols</b> <!--Padding is optional--> </span></div>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/deer.png" +" height='25' width='25'>")+"</i>" +' Mule Deer' + '<br>';
    div.innerHTML +=
            ('<i style="border:none;">'+" <img src="+ "img/elk.png" +" height='25' width='25'>")+"</i>" +' Elk' ;
    return div;
};
// var currentLegend = legend;
// currentLegend.addTo(map);
var groupedOverlays = {
    "Reference Layers": {
    "Barriers": barriers,
    "Antenna Locations": antennas,
        "Historic Distributions": historic_dist,
        "HUC 10": huc10
}};
var baseLayers = getCommonBaseLayers(map); // see baselayers.js

map.addControl(new customControl());
map.addControl(new customControl2());
L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);

gpxTimeLayerFish3.addTo(map);
// var legendToggle = L.easyButton({
//   states: [{
//     stateName: 'legend-on',
//     icon: 'fa-list-ul',
//     title: 'Toggle Legend Off',
//     onClick: function(control) {
//       map.removeControl(currentLegend);
//       control.state('legend-off');
//     }
//   }, {
//     icon: 'fa-th-list',
//     stateName: 'legend-off',
//     onClick: function(control) {
//       currentLegend.addTo(map);
//       control.state('legend-on');
//     },
//     title: 'Toggle Legend On'
//   }]
// });
// legendToggle.addTo(map);
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Deer 1') {
        map.flyToBounds(gpxLayer.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.name === 'Deer 2') {
       map.flyToBounds(gpxLayer2.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.group.name === 'Deer Group') {
       map.flyToBounds(gpxLayer4.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
    else if  (eventLayer.group.name === 'Elk Group') {
       map.flyToBounds(gpxLayer3.getBounds(), {
        paddingBottomRight: [40, 40]
    })
    }
});
map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === 'Land Ownership') {
        map.removeControl(currentLegend );
        currentLegend = legend;
        if (legendToggle._currentState.stateName === 'legend-on') {
            currentLegend.addTo(map);
        }
    }
    });
map.on('overlayremove', function (eventLayer) {
    if (eventLayer.name === 'Land Ownership') {
        map.removeControl(currentLegend );
        currentLegend = legend2;
       if (legendToggle._currentState.stateName === 'legend-on') {
            currentLegend.addTo(map);
        }
    }
    });
L.control.scale({position: "topright"}).addTo(map);
 $('#dist3').show();
gpxTimeLayerFish5.on('add', function(){
    $('#dist4').show();
});
gpxTimeLayerFish5.on('remove', function(){
    $('#dist4').hide();
});
gpxTimeLayerFish1.on('add', function(){
    $('#dist1').show();
});
gpxTimeLayerFish1.on('remove', function(){
    $('#dist1').hide();
});
gpxTimeLayer3.on('add', function(){
    $('#dist2').show();
});
gpxTimeLayer3.on('remove', function(){
    $('#dist2').hide();
});
gpxTimeLayerFish3.on('add', function(){
    $('#dist3').show();
});
gpxTimeLayerFish3.on('remove', function(){
    $('#dist3').hide();
});

// if (map.hasLayer(gpxTimeLayerFish1)){
        //     $('#dist1').show();
        // }
        // if (map.hasLayer(gpxTimeLayer3)){
        //      $('#dist2').show();
        // }
        // if (map.hasLayer(gpxTimeLayerFish3)){
        //      $('#dist3').show();
        // }
        // if (map.hasLayer(gpxTimeLayerFish5)){
        //      $('#dist4').show();
        // }
map.on('moveend', function(e) {
   var bounds = map.getCenter();
   var zoom = map.getZoom();
   console.log(bounds, zoom);
});

map.on('click', function(e) {
    console.log(e.latlng);
});
// pics.on('click',function(e) {
//         //console.log(this.options.win_url);
//         window.open('https://youtu.be/Nh9BZ0DiAic');
//     });