Cross-domain Data Proxy
John Huschka, Coldwater Software
January 8, 2015

This is a standard SharePoint 2013 sandboxed solution, deployed as two features:
1.  DataProxyLibrary:  The library that will contain data proxy objects.
2.  DataProxyContents:  The data proxy objects and sample associate credentials data.

This solution accompanies a seperate solution, ProfileWithCredentials.  This solution 
should be deployed first.  (ProfileWithCredentials is dependent on objects in this
solution.)

This solution has been tested with SharePoint 2013, on premise.  The core techniques
are designed to be compatible with SharePoint 2010, 2013, and Office 365.

Before deploying:
1.  Edit the Elements.xml file within the AssociateCredentialsInstance, substituting
     appropriate user Ids for your security domain.
2.  Edit the ProxyPage project properties to reflect the SharePoint site/web to which 
     you want to deploy.


