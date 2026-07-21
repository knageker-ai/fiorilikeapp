sap.ui.define(
    //while we add dependencies, use module name
    [
        "ey/ap/acc/controller/BaseController",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/m/MessageBox"
    ], 
    function(BaseController, Filter, FilterOperator, MessageBox){
        return BaseController.extend("ey.ap.acc.controller.View1",{

            onInit: function(){
                //debugger;
                //this.getOwnerComponent().getManifest()
                //this.getOwnerComponent().getModel()
            },  
            onSelectItem: function(oEvent){
                //Step 1: get the path of the element selected by user
                var sPath = oEvent.getParameter("listItem").getBindingContextPath();
                //Step 2: Get the view 2 object
                // var oView2 =  this.getView().getParent().getPage("idView2");
                //Due to new Split App the deposition changed as below

                //var oView2 =  this.getView().getParent().getParent().getDetailPage("idView2");
                //Step 3: Bind element
                //oView2.bindElement(sPath);
                //Step 4: nav to view2
                this.onNext(sPath);
            },
            onDelete: function(oEvent){
                //MessageBox.confirm("This function is under contruction and you need to complete this 😂");
                //Hint: Get All list items which are selected, loop at them, delete them one by one from list object
                var oList = this.getView().byId("myList");
                var oSelectedItem = oList.getSelectedItem();
                oList.removeItem(oSelectedItem);
            },
            onSearch: function(oEvent){
                //Step 1: get the text typed by user in search field
                var sQuery = oEvent.getParameter("query");
                console.log(sQuery);
                //Step 2: Construct a filter object from sap.ui.model
                var oFilter1 = new Filter("name", FilterOperator.Contains ,sQuery);
                var oFilter2 = new Filter("taste", FilterOperator.Contains ,sQuery);
                var aFilter = [oFilter1, oFilter2];

                //make a filter that is not exclusive AND, rather an OR
                var oFilter = new Filter({
                    filters: aFilter,
                    and: false
                });
                
                //Step 3: inject this filter to the items aggregation of list control
                var oList = this.getView().byId("myList");
                oList.getBinding("items").filter(oFilter);
            },
            onNext: function(sPath){

                // //step 1: get the parent control
                // var oAppCon = this.getView().getParent().getParent();
                // //step 2: container have the power to navigate to 2nd child
                // oAppCon.toDetail("idView2");
                var sIndex = sPath.split("/")[sPath.split("/").length - 1];
                this.getRouter().navTo("superman",{
                    zkas: sIndex
                });

            }


        });
    }
);