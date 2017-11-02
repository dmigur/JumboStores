package com.tallink.googlemap.web.api;

import java.io.Serializable;

/**
 * Created by dmitrigu on 24.04.17.
 */
public class DefaultSettings implements Serializable {

    private int showItems;
    private String itemsFile;
    private String address;
    private String geoGoogleMapKey;
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
