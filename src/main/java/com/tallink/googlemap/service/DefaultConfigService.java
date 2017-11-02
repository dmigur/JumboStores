package com.tallink.googlemap.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.tallink.googlemap.ServiceNames.DEFAULT_CONFIG_SERVICE;

/**
 * Created by dmitrigu on 01.09.16.
 */

@Service(DEFAULT_CONFIG_SERVICE)
public class DefaultConfigService {

    @Value("${googlemap.show.items}")
    private int showItems;

    @Value("${googlemap.items.file}")
    private String itemsFile;

    @Value("${googlemap.address}")
    private String address;

    @Value("${googlemap.geoGoogleMapKey}")
    private String geoGoogleMapKey;

    @Value("${googlemap.geoGoogleMapUrl}")
    private String geoGoogleMapUrl;

    public int getShowItems() {
        return showItems;
    }

    public void setShowItems(int showItems) {
        this.showItems = showItems;
    }

    public String getItemsFile() {
        return itemsFile;
    }

    public void setItemsFile(String itemsFile) {
        this.itemsFile = itemsFile;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGeoGoogleMapKey() {
        return geoGoogleMapKey;
    }

    public void setGeoGoogleMapKey(String geoGoogleMapKey) {
        this.geoGoogleMapKey = geoGoogleMapKey;
    }

    public String getGeoGoogleMapUrl() {
        return geoGoogleMapUrl;
    }

    public void setGeoGoogleMapUrl(String geoGoogleMapUrl) {
        this.geoGoogleMapUrl = geoGoogleMapUrl;
    }
}
