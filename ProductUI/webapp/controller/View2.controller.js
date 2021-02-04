sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/core/routing/History",
        "sap/ui/core/BusyIndicator",
        "sap/m/MessageBox"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,MessageToast,History,BusyIndicator,MessageBox) {
         "use strict";
        
           
         
		return Controller.extend("ns.HTML5Module.controller.View2", {
             
            onInit:  function() {
		            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    var x=oRouter.getRoute("RouteView2").attachMatched(this._onRouteMatched, this);
            },
            
            setData: async function(pid){
                 BusyIndicator.show();
            	const data=  await $.ajax({
			        url: "https://okwbsxlma7596cwsoject-productxsjs.cfapps.us10.hana.ondemand.com/xsjs/getById.xsjs",
			        data:{"id":pid},
			        type: 'GET'
		    	     });
                    var productData=new sap.ui.model.json.JSONModel(data[0]);
                    BusyIndicator.hide();
                    this.getView().setModel(productData);
            },

            _onRouteMatched: async function(oEvent) {
            	   
            	    var sObject = oEvent.getParameter("arguments").object;
                    var pid = JSON.parse(sObject) ;
                    this.setData(pid.ProductId);
                   
            },
            
            deleteProduct:async function(id){
			
			const data =await $.ajax({
			       url: "https://okwbsxlma7596cwsoject-productxsjs.cfapps.us10.hana.ondemand.com/xsjs/deleteById.xsjs",
			       data:{"id":id},
			       type: 'GET'	
			});
			return data;
		},
		
            
            onDelete:  function (oEvent,ProductId) {
			var that = this;
			MessageBox.warning("Are you sure to delete this item ?", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: async function (sAction) {
					if (sAction === MessageBox.Action.OK){
					   var status = await that.deleteProduct(ProductId);
					    if (status == "1"){
					      that.onNavBack();
					      MessageToast.show("Deleted : "+ ProductId);
					    }
					    else{
					    		MessageBox.error(`Could not delete ${ProductId}.Please try again later.` )
					    }  
		           
					}
				}
				
			});
		},

	    	onEdit: function (oEvent) {
			
			var oBindingContext = this.getView().getModel().oData;
			
			
            if (!this._oDialog) {
		        this._oDialog = sap.ui.xmlfragment("editFragment","ns.ProductUI.view.edit",this);
		    }
		    
		    var  dataModel= new sap.ui.model.json.JSONModel(oBindingContext);
		 
		  	this._oDialog.setModel(dataModel,"dataModel");
		    
		    this._oDialog.open();
		},
		
		    onEditData: async function(oEvent){
		   	 var oDialog = oEvent.getSource().getParent();
		   	 var data=oDialog.oModels.dataModel.oData;
		   	 var id=oDialog.oModels.dataModel.oData.ProductId;
		   	 
		   	 var jsonData=JSON.stringify(data);
		   	 
		   	 
		   	 BusyIndicator.show();
		   	 
		   	 
		   	 var result= await $.ajax({
		   	 	type:"POST",
		   	 	data:jsonData,
		   	 	crossDomain: true,
		   	 	url:`https://okwbsxlma7596cwsoject-productxsjs.cfapps.us10.hana.ondemand.com/xsjs/updateById.xsjs/?id=${id}`,
		   	 	dataType: "json",
		   	 }).done((dat)=>{
		   	 	
		   	 	BusyIndicator.hide();
		   	    oDialog.close();
		   	    this.setData(id);
		   	 	
		   	 }).fail((error)=>{
		   	 	
		   	 });
		   	 
		   },
	  
        	cancel : function(oEvent){ 
	            var oDialog = oEvent.getSource().getParent();
                oDialog.close();
	        },
	        
	        
            onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteView1", true);
			}
		}

        });
	});