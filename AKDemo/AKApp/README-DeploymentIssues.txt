EAPopulate README

Before this app solution is deployed, any required site collection level workflow features or solutions must be deployed first.

Generally, these items are (and are enabled by):
	Enable-SPFeature -Identity WorkflowServiceStore –Url <site collection URL>
	Enable-SPFeature -Identity WorkflowTask –Url <site collection URL>

This is because this solution activates SharePoint standard workflow features at the appweb level, which creates content types
and columns in the appweb.  After that, if we attempt to activate the features at the site collection level, there is a 
content type and column collision because the objects already exist in a sub-web.

If this happens, you will generally get messages something like:

Exception: Microsoft.SharePoint.SPException: The field with Id {55b29417-1042-47f0-9dff-ce8156667f96} defined in 
feature {57311b7a-9afd-4ff0-866e-9393ad6647b1} was found in the current site collection or in a subsite

or

Exception: Microsoft.SharePoint.SPException: The field with Id {40270da4-0a34-4c14-8c30-59e065a28a4d} defined in 
feature {2c63df2b-ceab-42c6-aeff-b3968162d4b1} was found in the current site collection or in a subsite.
