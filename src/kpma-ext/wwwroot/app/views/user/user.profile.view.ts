import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {UserService, UserViewModel, UserRoleViewModel} from '../../services/user.service';

import {DropDown, DropdownValueAccessor} from '../../controls/dropdown/dropdown.control';

@Component({
	moduleId: module.id,
	selector: 'user-profile',
	templateUrl: 'user.profile.html',
	directives: [DropDown, DropdownValueAccessor]

})
export class UserProfile {
}