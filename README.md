# App name
ITSM-Admin-Layout

# App Description
This app is used to display modules/submodules in the PIER admin tool. Currently this app is consuming child app called ITSM-Admin-App only.

# App Integration
App Tag - __itsm-admin-layout__  
Tag Props -
__userid__ - `String`

# How to integrate Module and Submodule menu in the app?

**Step 1.** To diplay menu in the module dropdown we need to insert module name and it's submodule name in to the Database side.  

To add menu in the Database we have to insert our module & submodule name in the existing JSON. 

You will get existing JSON via below API call.

[https://localhost:3000/api/userPref/getFavorites?favoriteName=itsm-admin-menu-layout](https://localhost:3000/api/userPref/getFavorites?favoriteName=itsm-admin-menu-layout)

You have to add your own JSON for new module & submodules as below.

 ```bash
 {  
      `module_name`: `Your module name goes here which will display in the module dropdown`,  
      `display_header_name`: `String`, (Your module display name goes here)  
      `display_order`: `Number`, (Your module name will be display in ascending order by providing numeric value)  
      `display_name`: `String`,  (Noy in use as of now)   
      `writeaccess_feature`: `STRING`, (MODULENAME_READ)  
      `isactive`: `Number`, (1 or 0 ) 1 means active and 0 means inactive  
      `is_default`: `Number`, (1 or 0) To display by default    
      `submodules`:  [  
        {  
          `module_name`: `String`, (Your submodule name goes here which will display in the header bar)  
          `display_name`: `String`,  (Your submodule display name goes here)  
          `is_default`: `Number`, (1 or 0) To display by default   
          `has_access`: `String`,  
          `isform`: `Boolean`  (If your submodule required to load initially form in the admin app)  
        }  
      ]  
  }
 ```
    
**Step 2.** After preparing above JSON you have to update the existing JSON via CRUD API.  

**Note:** You will get some existing records in above mentioned API call response. So you have to add your own JSON in to the existing JSON and then need to update. You will get other required details like userfavId to update in above mentioned API response.

## CRUP API URLs with Envionment wise

### For Dev environment: 
[http://userpreference-svc-dev.dev.px-npe02b.cf.t-mobile.com/swagger-ui.html#/](http://userpreference-svc-dev.dev.px-npe02b.cf.t-mobile.com/swagger-ui.html#/)

### For Test & UAT environment:
[http://userpreference-svc-test.test.px-npe02b.cf.t-mobile.com/swagger-ui.html#/](http://userpreference-svc-test.test.px-npe02b.cf.t-mobile.com/swagger-ui.html#/)

### For Prod environment:
[https://userpreference-svc.apps.px-prd04.cf.t-mobile.com/swagger-ui.html#/](https://userpreference-svc.apps.px-prd04.cf.t-mobile.com/swagger-ui.html#/)

**End point name for update:** PUT /api/v1/userFavorite/{userfavId}
**Payload** Your newly added JSON with the existing JSON.
    