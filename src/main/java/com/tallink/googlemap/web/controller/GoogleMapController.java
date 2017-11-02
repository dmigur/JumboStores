package com.tallink.googlemap.web.controller;

import com.tallink.googlemap.service.DefaultConfigService;
import com.tallink.googlemap.web.api.DefaultSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.tallink.googlemap.ServiceNames.DEFAULT_CONFIG_SERVICE;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by dmitrigu on 31.10.17.
 */
@Controller
public class GoogleMapController {

    @Autowired
    @Qualifier(DEFAULT_CONFIG_SERVICE)
    private DefaultConfigService defaultConfigService;

    Logger LOG = LoggerFactory.getLogger(GoogleMapController.class);


    @ResponseStatus(OK)
    @RequestMapping(value = "/api/settings", method = GET)
    @ResponseBody
    public DefaultSettings getDefaultSettings() {

        LOG.info("settings");

        DefaultSettings settings = new DefaultSettings();
        settings.setItemsFile(defaultConfigService.getItemsFile());
        settings.setShowItems(defaultConfigService.getShowItems());
        settings.setAddress(defaultConfigService.getAddress());
        settings.setGeoGoogleMapKey(defaultConfigService.getGeoGoogleMapKey());
        settings.setGeoGoogleMapUrl(defaultConfigService.getGeoGoogleMapUrl());
        return settings;
    }
}