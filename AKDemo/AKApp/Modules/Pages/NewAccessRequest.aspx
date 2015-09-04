<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
  <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.js"></script>
  <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>
  <meta name="WebPartPageExpansion" content="full" />

  <!-- Add your CSS styles to the following file -->
  <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
  <link rel="Stylesheet" type="text/css" href="../Content/kendo.common.min.css" />
  <link rel="Stylesheet" type="text/css" href="../Content/kendo.default.min.css" />
  <link rel="Stylesheet" type="text/css" href="../Content/kendo.dataviz.min.css" />
  <link rel="Stylesheet" type="text/css" href="../Content/kendo.dataviz.default.min.css" />

  <!-- Add your JavaScript to the following file -->
  <script type="text/javascript" src="../Scripts/App.js"></script>
  <script type="text/javascript" src="../Scripts/angular.min.js"></script>
  <script type="text/javascript" src="../Scripts/Controllers/AccessRequestController.js"></script>
  <script type="text/javascript" src="../Scripts/KendoUI/kendo.all.min.js"></script>
  <SharePoint:ScriptLink Name="clienttemplates.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink Name="clientforms.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink Name="clientpeoplepicker.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink Name="autofill.js" runat="server" LoadAfterUI="true" Localizable="false" />
  <SharePoint:ScriptLink Name="sp.core.js" runat="server" LoadAfterUI="true" Localizable="false" />

  <!-- inline styles to suppress some of the chrome -->
  <style type="text/css">
    /* Hide quick launch bar */
    #sideNavBox {
      display: none;
    }

    #contentBox {
      margin: 0px !important;
      margin-top: -18px !important;
    }
    /* Hide SP title (subnav) bar */
    #s4-titlerow {
      display: none !important;
    }

    #s4-bodyContainer {
      padding-bottom: 0px;
    }
  </style>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
  Access Request Form
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
  <div class="AccessRequestFormPageHeader">
  </div>
  <table cellspacing="0" border="0" width="100%" class="AccessRequestFormPage">
    <tr>
      <td>
        <div id="AccessRequestFormPageBody" ng-app="mainApp" ng-controller="accessRequestController" class="AccessRequestFormPageBody">
          <div class="AccessRequestFormPageBodySection">
            <h1>Access Request</h1>
          </div>
          <div class="AccessRequestFormPageBodySectionSeparator"></div>
          <div class="AccessRequestFormPageBodySectionHeader">
            <h3>General Information</h3>
          </div>
          <div class="AccessRequestFormPageBodySectionHalf">
            <p>User Name</p>
            <div kendo-validator="userNameValidator">
              <input type="text" id="UserNameTextBox" name="UserNameTextBox" ng-model="userName" required validationmessage="Enter new user name" />
            </div>
            <p>Department</p>
            <select kendo-drop-down-list="UserDepartmentDropDown" id="UserDepartmentDropDown" ng-model="departmentId" k-options="departmentOptions" k-ng-delay="departmentOptions"></select>
            <p>Job Title</p>
            <div kendo-validator="userTitleValidator">
              <input type="text" id="UserTitleTextBox" name="UserTitleTextBox" ng-model="userTitle" required validationmessage="Enter new user's title" />
            </div>
            <p>Start (Hire) Date</p>
            <input kendo-date-picker="UserStartDatePicker" id="UserStartDatePicker" ng-model="startDate" />
            <p>Requestor</p>
            <input id="requestorName" class="AccessRequestFormReadOnlyField" ng-model="requestorName" style="width: 438px;" readonly></input>
            <input id="requestorIdHiddenInput" class="AccessRequestFormReadOnlyField" ng-model="requestorId" style="display: none"></input>
          </div>
          <div class="AccessRequestFormPageBodySectionHalf">
            <p>Status</p>
            <input id="CurrentStatus" class="AccessRequestFormReadOnlyField" ng-model="currentStatus" style="width: 470px;"></input>
          </div>
          <div class="AccessRequestFormPageBodySectionSeparator"></div>
          <div class="AccessRequestFormPageBodySectionHeader">
            <h3>Request Details (Systems and Resources)</h3>
          </div>
          <div class="AccessRequestFormPageBodySection">
            <div id="ResourceGrid" style="display: block" kendo-grid="resourcesGrid" k-options="resourcesGridOptions" k-ng-delay="resourcesGridOptions">
              <div kendo-toolbar k-options="toolbarOptions"></div>
            </div>
          </div>
          <input type="button" id="SaveButtonBottom" value="Save Access Request" class="AccessRequestFormSaveButton" ng-click="saveData()" />
        </div>
      </td>
    </tr>
  </table>
  <div class="AccessRequestFormPageFooter">
  </div>
  <script type="text/javascript">
    // Run your custom code when the DOM is ready.
    $(document).ready(function () {
      // Initialize the form.
      var angularScope = angular.element($("#AccessRequestFormPageBody")).scope();
      angularScope.setDepartmentDropDownValues();
      angularScope.setGridColumns();
    });
  </script>
</asp:Content>
