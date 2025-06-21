package com.netflixgpt.core.models;


import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import sun.java2d.loops.CustomComponent;

@Model(
        adaptables = SlingHttpServletRequest.class,
        adapters = { CustomComponent.class, ComponentExporter.class },
        resourceType = TitleTextComponentImpl.RESOURCE_TYPE,
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
        )
@Exporter(
        name = ExporterConstants.SLING_MODEL_EXPORTER_NAME,
        extensions = ExporterConstants.SLING_MODEL_EXTENSION
        )
public class TitleTextComponentImpl implements TitleTextComponent {

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    static final String RESOURCE_TYPE = "wknd-spa-react/components/title-text-component";

    // This function is important to export JSON depending on resourcetype.
    @Override
    public String getExportedType() {
        return TitleTextComponentImpl.RESOURCE_TYPE;
    }


    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public String getDescription() {
        return description;
    }
}