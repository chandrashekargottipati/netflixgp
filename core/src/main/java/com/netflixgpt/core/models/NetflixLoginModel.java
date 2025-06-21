package com.netflixgpt.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(
    adaptables = Resource.class,
    adapters = { ComponentExporter.class },
    resourceType = NetflixLoginModel.RESOURCE_TYPE,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(
    name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
    extensions = ExporterConstants.SLING_MODEL_EXTENSION
)
public class NetflixLoginModel implements ComponentExporter {

    public static final String RESOURCE_TYPE = "netflixgpt/components/netflix-login";

    @ValueMapValue
    private String username;

    @ValueMapValue
    private String password;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String redirectUrl;

    @ValueMapValue
    private String logo;

    @ValueMapValue
    private String backgroundImage;

    public String getLogo() {
        return logo;
    }

    public String getBackgroundImage() {
        return backgroundImage;
    }


    // Getters for SPA JSON export
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getDescription() {
        return description;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    @Override
    public String getExportedType() {
        return RESOURCE_TYPE;
    }
}
