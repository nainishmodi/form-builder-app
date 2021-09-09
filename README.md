# App name
ITSM-Admin-Layout

# App Description
This app is used to display modules/submodules in the PIER admin tool. This app is consuming child app called ITSM-Admin-App.

# App Integration
 App Tag - __itsm-admin-layout__  
 
 Tag Props -   
__userid__ - `String` (Your NTID)  
__module__ - `String` (Here your main module name goes i.e scr/crr)  
__submodule__ - `String` / Values (Your submodule name goes of your main module i.e mapping/values)  
__addmode__ - `Boolean` (If you want add record feature from directly in the grid.)  
__editmode__ - `Boolean` (If you want edit record feature from directly grid.)  
__isform__ - `Boolean` (If you want form and based on form submission you want to display Grid of your module.)  

# How to integrate Module and Submodule in the app?
**To integrate your module in to the follow below steps**

__Note__: Your module & submodule value should be same everywhere wherever required and it should be in lowercase in operational things. 

**Step 1.** First we need to add settings based on module and submodule (If submodule required) in the common Admin App settings Database side as below

End point name:-
[http://localhost:3000/api/userPref/getFavorites?favoriteName=itsm-admin-app-modulesettings](http://localhost:3000/api/userPref/getFavorites?favoriteName=itsm-admin-app-modulesetting)

API response JSON should be like as below. Here you have to add your settings module wise in existing data and have to update using User Preference Crud API (You will find API details in Step 3).

**I.e** Primary key would be record's primary key which will be used for CRUD operations and Prefix will be used for API calls.

`appSettings`: {`yourmodulename`:{`submoodulename1`:{`primaryKey`:"id",`prefix`:""},`submoodulename2`:{`primaryKey`:'id',`prefix`:''}}}  

**Note:** Some existing settings should be always there in the API response, Don't touch it, You have to add your own settings based on requirement
you can add multiple submodules and its settings within single module .

**Example 1: With Module and Submodule**  
`appSettings`:{`yourmodulename`:{`submoodulename1`:{`primaryKey`: "id",`prefix`:""},`submoodulename2`:{`primaryKey`:'id',`prefix`:''}}}  

**Example 2: With Module only**    
`appSettings`:{`yourmodulename`: {`primaryKey`:"id"`prefix`:""}}}  
    
**Step 2.** We need to add grid name settings based on module & submodule name in userprefrence Database side with below details

`appDescription` = `itsm-admin-app`    (**Note**: This value should be fixed in all types of Environments)  
`settingDescription` = `itsm-admin-{yourmodulename}-{yoursubmodulename}-app` (**Note:** If submodule is not there then you can skip -{submodulename})

Above settings from Database will give you the `settingsTypeId` and your `settingDescription`

**Step 3.**. Add your grid columns in the Database side using user preference API with above created setting `settingsTypeId` and `settingDescription` i.e (itsm-admin-newmodule-app)  

__Payload__:   
{  
  `contextName`: "string",  
  `createdBy`: "string",  
  `createdDate`: "2021-09-08T10:06:21.794Z",  
  `favoriteConfig`: "your grid columns goes here with stringify json",  
  `favoriteName`: "string",  
  `modifiedBy`: "string",  
  `modifiedDate`: "2021-09-08T10:06:21.794Z",  
  `settingsTypeId`: "You will get this by step 2",  
  `userCode`: "-1"  
}  

## CRUP API URLs with Envionment wise

### For Dev environment: 
[http://userpreference-svc-dev.dev.px-npe02b.cf.t-mobile.com/swagger-ui.html#/](http://userpreference-svc-dev.dev.px-npe02b.cf.t-mobile.com/swagger-ui.html#/)

### For Test & UAT environment:
[http://userpreference-svc-test.test.px-npe02b.cf.t-mobile.com/swagger-ui.html#/](http://userpreference-svc-test.test.px-npe02b.cf.t-mobile.com/swagger-ui.html#/)

### For Prod environment:
[https://userpreference-svc.apps.px-prd04.cf.t-mobile.com/swagger-ui.html#/](https://userpreference-svc.apps.px-prd04.cf.t-mobile.com/swagger-ui.html#/)

**End point name for create:** POST /api/v1/userFavorite
**End point name for update:** PUT /api/v1/userFavorite/{userfavId}

**Step 4.**. Need to add end points for List/Create/Update in the backend side which serves the data from the API. In config.js there is Object for module specific End Points there we have to add our API url module wise.  
**Step 5.**. Add Network Policy for outbound in Admin app and inbound to the respective API side.  