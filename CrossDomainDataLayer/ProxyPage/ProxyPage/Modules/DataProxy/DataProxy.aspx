<%@ Page language="C#" MasterPageFile="~masterurl/default.master"    Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document"  %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
<SharePoint:CssRegistration Name="default" runat="server"/>
<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxy/Scripts/jquery-2.1.1.min.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxy/Scripts/ConfigureMessagingProcessor.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
<WebPartPages:AllowFraming runat="server" __WebPartId="{B8617452-48FE-40AF-BDE9-86E9ADA1CDFD}"/>
</asp:Content>
















