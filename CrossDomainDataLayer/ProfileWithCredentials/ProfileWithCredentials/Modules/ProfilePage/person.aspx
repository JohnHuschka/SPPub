<%@ Page language="C#" MasterPageFile="~masterurl/custom.master"      Inherits="Microsoft.SharePoint.Portal.WebControls.MySitePublicWebPartPage,Microsoft.SharePoint.Portal,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" meta:progid="SharePoint.WebPartPage.Document" meta:webpartpageexpansion="full" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="OSRVWC" Namespace="Microsoft.Office.Server.WebControls" Assembly="Microsoft.Office.Server, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="OSRVUPWC" Namespace="Microsoft.Office.Server.WebControls" Assembly="Microsoft.Office.Server.UserProfiles, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="SPSWC" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="SEARCHWC" Namespace="Microsoft.Office.Server.Search.WebControls" Assembly="Microsoft.Office.Server.Search, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="wssuc" TagName="NavItem" src="~/_controltemplates/15/NavItem.ascx" %>
<%@ Register TagPrefix="wssuc" TagName="Welcome" src="~/_controltemplates/15/Welcome.ascx" %>

<asp:Content contentplaceholderid="PlaceHolderAdditionalPageHead" runat="server">
	<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxyScripts/jquery-1.9.1.min.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
  	<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxyScripts/angular.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
  	<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxyScripts/smart-table.debug.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
  	<SharePoint:ScriptLink LoadAfterUI="false" Defer="false" name="~site/Lists/DataProxyScripts/credentialsAJSApp.js" runat="server" OnDemand="false"></SharePoint:ScriptLink>
	<SPSWC:ActivityFeedLink Consolidated="false" runat="server"/>  
  <SPSWC:MySiteHideDiv HideRibbonRow="true" runat="server"/>
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderPageTitle" runat="server">
  <SPSWC:PersonalSpaceMainHeading TitleMode="true" runat="server"/>
  <SPSWC:PersonalSpacePublicRedirect Visible="false" runat="server"/>
  <SPSWC:AddInfoToSpPageContext runat="server"/>
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderPageTitleInTitleArea" runat="server">
	<SPSWC:PersonalSpaceTitleBar runat="server"/>
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderSiteName" runat="server">
	<SPSWC:PersonalSpaceMainHeading TitleMode="true" runat="server"/>
</asp:Content>

<asp:Content contentplaceholderid="PlaceHolderMain" runat="server">
	<SPSWC:ProfilePropertyLoader id="m_objLoader" LoadFullProfileOfCurrentUser="true" runat="server"/>
  <div>
    <table id="MSO_ContentTable" MsoPnlId="layout" class="ms-core-tableNoSpace ms-fillBox"> <tr id="TopRow"> <td valign="top" id="TopCell" colspan="3"> 
		<WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" AllowPersonalization="true" ID="TopZone" Title="<%$Resources:sps,LayoutPageZone_TopZone%>" Orientation="Vertical"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone> </td> </tr> <tr id="MiddleRow"> <td valign="top" id="MiddleLeftCell" width="60%"> 
			<WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" AllowPersonalization="true" ID="MiddleLeftZone" Title="<%$Resources:sps,LayoutPageZone_MiddleLeftZone%>" Orientation="Vertical"><ZoneTemplate>
			<WebPartPages:PageViewerWebPart runat="server" ContentLink="http://jehcwsserver/sites/DevTest/Lists/DataProxy/DataProxy.aspx" SourceType="URL" Title="DataProxy" FrameType="None" SuppressWebPartChrome="False" Description="Displays another Web page on this Web page. The other Web page is presented in an IFrame." IsIncluded="True" ZoneID="MiddleLeftZone" PartOrder="2" FrameState="Normal" AllowRemove="False" AllowZoneChange="False" AllowMinimize="False" AllowConnect="False" AllowEdit="False" AllowHide="False" IsVisible="False" Hidden="True" CatalogIconImageUrl="/_layouts/15/images/mscntvwl.gif" DetailLink="" HelpLink="" HelpMode="Modeless" Dir="Default" PartImageSmall="" MissingAssembly="Cannot import this Web Part." PartImageLarge="/_layouts/15/images/mscntvwl.gif" IsIncludedFilter="" ExportControlledProperties="True" ConnectionID="00000000-0000-0000-0000-000000000000" ID="g_f3da60a9_a71c_49b8_bdb5_209791f0d32f" AllowClose="False" ChromeType="None" ExportMode="All" __MarkupType="vsattributemarkup" __WebPartId="{F3DA60A9-A71C-49B8-BDB5-209791F0D32F}" WebPart="true" Height="" Width=""></WebPartPages:PageViewerWebPart>


<SPSWC:AskMeAboutWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{795ACA77-A78A-481C-AA90-079A86DF9B74}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Ask Me About</Title>
  <FrameType>TitleBarOnly</FrameType>
  <Description>The web part that shows a list of keywords that others can ask me questions on.</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleLeftZone</ZoneID>
  <PartOrder>4</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_795aca77_a78a_481c_aa90_079a86df9b74</ID>
</WebPart>
</SPSWC:AskMeAboutWebPart>

<SPSWC:PublishedFeedWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{91652DBC-F20F-4162-BA58-A1934B6E244C}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Activity Feed</Title>
  <FrameType>None</FrameType>
  <Description>Displays a user&apos;s most recent conversations and activities.</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleLeftZone</ZoneID>
  <PartOrder>6</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_91652dbc_f20f_4162_ba58_a1934b6e244c</ID>
</WebPart>
</SPSWC:PublishedFeedWebPart>

<SPSWC:MySitePersonalSiteUpgradeOnNavigationWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{CEDCD506-E428-4471-AA1B-F54F0C5E4773}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>MySite Personal Site Upgrade On Navigation</Title>
  <FrameType>None</FrameType>
  <Description>Creates or upgrades a user&apos;s personal site upon navigation to the My Site Host site.</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleLeftZone</ZoneID>
  <PartOrder>8</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>false</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>false</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_cedcd506_e428_4471_aa1b_f54f0c5e4773</ID>
</WebPart>
</SPSWC:MySitePersonalSiteUpgradeOnNavigationWebPart>
			</ZoneTemplate></WebPartPages:WebPartZone> </td> <td style="padding:0px 10px"></td> <td valign="top" id="MiddleLRightCell" width="40%"> 
			<WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" AllowPersonalization="true" ID="MiddleRightZone" Title="<%$Resources:sps,LayoutPageZone_MiddleRightZone%>" Orientation="Vertical"><ZoneTemplate>
<SPSWC:ProfileInfoWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{6E077C64-C94F-4B60-9565-3494245FF335}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Profile Info</Title>
  <FrameType>None</FrameType>
  <Description>Shows basic profile info for the current user</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleRightZone</ZoneID>
  <PartOrder>2</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_6e077c64_c94f_4b60_9565_3494245ff335</ID>
</WebPart>
</SPSWC:ProfileInfoWebPart>

<WebPartPages:ContentEditorWebPart runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{3EC5A832-5DB5-46FE-A75B-008D50714187}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Credentials</Title>
  <FrameType>None</FrameType>
  <Description>Allows authors to enter rich text content.</Description>
  <IsIncluded>true</IsIncluded>
  <PartOrder>4</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_3ec5a832_5db5_46fe_a75b_008d50714187</ID>
  <ContentLink xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
  <Content xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor"><![CDATA[<div class="ng-scope" id="CredentialsDisplay"> &nbsp; 
   <div class="ng-scope" ng-controller="SPCredentials">
   <h1 class="ng-binding">{{userName}}&#39;s Credentials</h1>
   <table st-table="items">
   <tbody>
   <tr class="ng-scope" ng-repeat="row in items">
   <td>{{row.Title}}</td></tr>
   </tbody>
   </table>
</div> 
</div>]]></Content>
  <PartStorage xmlns="http://schemas.microsoft.com/WebPart/v2/ContentEditor" />
</WebPart>
</WebPartPages:ContentEditorWebPart>

<SPSWC:MySharedContext runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{6FBD661A-4FE4-493B-825E-28505FEE9EA2}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>In Common</Title>
  <FrameType>TitleBarOnly</FrameType>
  <Description>Shows what is in common between you and the user</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleRightZone</ZoneID>
  <PartOrder>6</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_6fbd661a_4fe4_493b_825e_28505fee9ea2</ID>
</WebPart>
</SPSWC:MySharedContext>

<SPSWC:ProfileManages runat="server" __MarkupType="xmlmarkup" WebPart="true" __WebPartId="{B7F721AE-ED79-4FF3-B0B2-56D95196E26E}" >
<WebPart xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://schemas.microsoft.com/WebPart/v2">
  <Title>Org Chart</Title>
  <FrameType>TitleBarOnly</FrameType>
  <Description>Shows your organization chart and reporting hierarchy</Description>
  <IsIncluded>true</IsIncluded>
  <ZoneID>MiddleRightZone</ZoneID>
  <PartOrder>8</PartOrder>
  <FrameState>Normal</FrameState>
  <Height />
  <Width />
  <AllowRemove>true</AllowRemove>
  <AllowZoneChange>true</AllowZoneChange>
  <AllowMinimize>true</AllowMinimize>
  <AllowConnect>true</AllowConnect>
  <AllowEdit>true</AllowEdit>
  <AllowHide>true</AllowHide>
  <IsVisible>true</IsVisible>
  <DetailLink />
  <HelpLink />
  <HelpMode>Modeless</HelpMode>
  <Dir>Default</Dir>
  <PartImageSmall />
  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
  <PartImageLarge />
  <IsIncludedFilter />
  <ExportControlledProperties>true</ExportControlledProperties>
  <ConnectionID>00000000-0000-0000-0000-000000000000</ConnectionID>
  <ID>g_b7f721ae_ed79_4ff3_b0b2_56d95196e26e</ID>
</WebPart>
</SPSWC:ProfileManages>
			</ZoneTemplate></WebPartPages:WebPartZone> </td> </tr> <tr id="BottomRow"> <td valign="top" id="BottomCell" colspan="3"> 
			<WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" AllowPersonalization="true" ID="BottomZone" Title="<%$Resources:sps,LayoutPageZone_BottomZone%>" Orientation="Vertical"><ZoneTemplate></ZoneTemplate></WebPartPages:WebPartZone> </td> </tr> </table>
  </div>
</asp:Content>
