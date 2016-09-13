import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {DocPropService, DocFieldModel, DocPropDataModel, DocPropViewModel} from '../../services/docprop.service';
import {Permitions} from '../../services/user.service';

import {DropDown, DropDownVA} from '../../controls/dropdown/dropdown.control';

import {MainAppComponent} from '../../main.component';
import {ShadowBox} from '../../components/shadowbox.component';

@Component({
	moduleId: module.id,
	selector: 'docprop-list',
	templateUrl: 'docprop.list.html',
	directives: [CORE_DIRECTIVES, DropDown, DropDownVA, ShadowBox],
	providers: [DocPropService]
})
export class DocPropList implements OnInit {

	propList: DocPropViewModel[] = [];
	editPropModel: DocPropViewModel;
	selectedPropModel: DocPropViewModel;
	addPropModel: DocPropViewModel = new DocPropViewModel();

	fieldList: DocFieldModel[] = [];

	permitions: Permitions = new Permitions();

	freezeProps = false;
	freezeFields = false;

	constructor(private propSrv: DocPropService, private route: ActivatedRoute, private mainCmp: MainAppComponent) {

		this.permitions = <Permitions>this.route.snapshot.params["permitions"];
	}

	ngOnInit() {
		this.refreshPropList();
	}

	refreshPropList() {

		this.freezeProps = true;

		this.propSrv.getPropList().subscribe(
			res => {
				this.propList = res;
				this.refreshFieldList();

				if (this.selectedPropModel) {
					var ff = this.propList.find(f => f.id == this.selectedPropModel.id);
					if (ff) {
						this.selectedPropModel = ff;
					}
				}
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeProps = false;
			}
		);
	}

	onSelectProp(prop) {
		this.selectedPropModel = prop;
		this.refreshFieldList();
	}

	onDocGroupChange() {
		this.addPropModel.documentTypeId = undefined;
	}

	onAddProp() {

		if (!this.addPropModel.documentGroupId) {
			return;
		}

		this.propSrv.savePropModel(this.addPropModel).subscribe(
			res => {
				this.selectedPropModel = <DocPropViewModel>res;
				this.refreshPropList();
			},
			err => {
				this.mainCmp.showError(err);
			}
		);
	}

	onEditProp(prop) {
		this.selectedPropModel = prop;
		this.editPropModel = prop;
		this.refreshFieldList();
	}

	onDeleteProp(prop) {

		this.mainCmp.showQuestion('Удалить настройку?').subscribe(
			answer => {
				if (answer) {
					this.propSrv.deletePropModel(prop.id).subscribe(
						res => {
							this.selectedPropModel = undefined;
							this.refreshPropList();
						},
						err => {
							this.mainCmp.showError(err);
						}
					);					
				}
			},
			err => {
				this.mainCmp.showError(err);
			}
		);
	}

	onCancelProp() {
		this.editPropModel = undefined;
	}

	onUpdateProp() {

		this.saveFieldList();

	}

	saveFieldList() {
		this.propSrv.saveFieldModel(this.fieldList).subscribe(
			res => {
				this.editPropModel = undefined;
				this.refreshFieldList();
			},
			err => {
				this.mainCmp.showError(err);
			}
		);
	}

	refreshFieldList() {

		if (!this.selectedPropModel) {
			this.fieldList = [];
			return;
		}

		this.freezeFields = true;

		this.propSrv.getFieldList(this.selectedPropModel.id).subscribe(
			res => {
				this.fieldList = res;
			},
			err => {
				this.mainCmp.showError(err);
			},
			() => {
				this.freezeFields = false;
			}
		);
	}
}