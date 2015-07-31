(function (env) {
    "use strict";
    var query_orig = DDG.get_query();
    
    //$.getJSON('http://dheerajavvari.zdev.net/duckducktrack.php?value='+encodeURIComponent(query_orig));
    
    env.ddg_spice_zomato = function(api_result){
        
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('zomato');
        }
        
        var res, loc_link_str, address_link_str, data, hours,
            estd = '';

        // Render the response
         console.log(api_result);
        //DDG.require('maps', function(){
            //DDG.require('moment.js', function(){
            //console.log(api_result);
                Spice.add({
                    id: "zomato",
                    name: "Places",
                    model: "Place",
                    view: "Places",
                    signal: "high",
                    data: api_result.restaurants,
                    meta: {
                        sourceName: "Zomato",
                        sourceUrl: 'http://www.zomato.com/'+api_result.city_url+'restaurants',
                        snippetChars: 110,
                        sourceIcon: true,
                        itemType: 'Places',
                        searchTerm: query_orig
                    },
                    templates: {
                        group: 'places',
                        //item: 'basic_flipping_item',
                        options: {
                            //front_content: Spice.zomato.z_front,
                            //back_content: Spice.zomato.z_back
                            //subheader: Spice.zomato.subheader,
                            moreAt: true,
                        }
                    },
                    relevancy: {
                        dup: 'url'
                    },
                    normalize: function(o) {
                        res = o;
                        //console.log(res);
                        if(!res) {
                            return null;
                        }
                        /*if(typeof(res.establishment_types) != 'undefined' && res.establishment_types.length) {
                            estd = res.establishment_types.map(function(elem){
                                        return elem.establishment_type.name;
                                    }).join(", ");
                        }*/

                            //cost_for_two: res.average_cost_for_two,
                            //currency: res.currency,
                            //currency_affix: res.currency_affix,
                        
                        loc_link_str = '<a href="https://maps.google.com/q='+res.subzone_name + ', ' + res.city+'">'+res.subzone_name + ', ' + res.city+'</a>';
                        address_link_str = '<a href="https://maps.google.com/q='+res.address+'">'+res.address+'</a>';
                        
                        if(res.all_timings && res.all_timings.length) {
                            hours = {
                                        "Mon": res.all_timings[0].time,
                                        "Tue": res.all_timings[1].time,
                                        "Wed": res.all_timings[2].time,
                                        "Thu": res.all_timings[3].time,
                                        "Fri": res.all_timings[4].time,
                                        "Sat": res.all_timings[5].time,
                                        "Sun": res.all_timings[6].time
                                    }
                        }
                        
                        // For places_item
                        data = {
                            id: res.id,
                            name: res.display_name,
                            url: res.url,
                            image: res.image_150_150,
                            boosted: res.has_featured_image_v3,
                            price: res.price_range,
                            reviews: res.votes,
                            rating: res.rating_aggregate,
                            //address_lines: res.location.address.split(","),
                            address: res.address,
                            phone: res.mobile_phone_display,
                            closed: !res.is_open_now,
                            neighbourhood: res.subzone_name,
                            city: res.city,
                            returned_categories: res.cuisines,
                            hours: hours,
                            engine: "Zomato",
                            coordinates: {
                                longitude: res.lat,
                                latitude: res.lon
                            }
                        };
                        
                        /*
                        // For basic_flipping_item
                        var data = {
                            data_front: {
                                title: res.name,
                                icon: res.thumb,
                                subtitle: estd
                            },
                            data_back: {
                                title: res.name,
                                url: res.url,
                            },
                            city: res.location.city,
                            place: res.location.locality,
                            lat: res.location.latitude,
                            lon: res.location.longitude
                        };
                        */
                        /*
                        // For base_flipping_item
                        var data = {
                            name: res.name,
                            reviews: res.user_rating.votes,
                            rating: res.user_rating.aggregate_rating,
                            url: res.url,
                            price: 2,
                            address: res.location.address,
                            place: res.location.locality,
                            city: res.location.city,
                            lat: res.location.latitude,
                            lon: res.location.longitude
                        };
                        */
                        //console.log(data);
                        return data;
                    }
                });
            //});
        //});
    };
}(this));
