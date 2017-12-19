import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';

// Grid component
// renders as responsive grid a set of items wit the provided display

@Component({
  selector: 'app-admin-overview-table',
  templateUrl: './admin-overview-table.component.html',
  styleUrls: ['./admin-overview-table.component.scss']
})
export class AdminOverviewTableComponent implements OnInit {
  @Input() tableItem;
  @Input() isDetailTable = false;

  options: SortablejsOptions = {
    draggable: '.draggableItem',
    filter: '.ignore-elements',
    handle: '.drag-icon',
    onUpdate: (event: any) => {
      this.postChangesToServer(event);
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
  }

  // drag end
  postChangesToServer(evt) {
    this.tableItem.tableData.forEach( function (rowItem, rowIndex) {
      let temp_cell = [];
      temp_cell = rowItem.rowData[ evt.oldIndex - 1];
      if (evt.newIndex > evt.oldIndex) {
        rowItem.rowData.splice( evt.newIndex, 0, temp_cell);
      } else {
        rowItem.rowData.splice( evt.newIndex - 1, 0, temp_cell);
      }

      if (evt.newIndex > evt.oldIndex) {
        rowItem.rowData.splice( evt.oldIndex - 1, 1);
      } else {
        rowItem.rowData.splice( evt.oldIndex, 1);
      }
    });
  }

  // click Edit button
  clickEditBtn(tableItem, rowItem) {
    if (tableItem.tableIsInlineEdit === true) {
      // show inline edit mode
      rowItem.isEditMode = true;
    } else {
      if (tableItem.tableEditUrl !== '') {
        // show edit page
        this.router.navigate(['/' + tableItem.tableEditUrl]);
      }
    }
  }

  // click Cancel/Save buttons in Edit mode
  clickSaveCancelEditBtn(rowItem) {
    rowItem.isEditMode = false;
  }

  // click checkbox of row
  clickRowCheckbox(tableItem, rowItem) {
    rowItem.isChecked = !rowItem.isChecked;

    let count = 0;
    tableItem.tableData.forEach(function(item, index) {
      if (item.isChecked) {
        count++;
      }
    });

    tableItem.checkedNum = count;
  }

  // reset Filter dropdown
  clickReset(tableColumns) {
    tableColumns.forEach(function(item, index) {
      item.filterOption = 'All';
    });
  }

  // click See All links
  clickSeeAllLink(tableName) {
    window['tableCategory'].forEach(function(categoryItem, categoryIndex) {
      categoryItem.selected = false;
    });

    window['tableCategory'].forEach(function(categoryItem, categoryIndex) {
      categoryItem.tableList.forEach(function(tableItem, tableIndex) {
        if (tableName === tableItem.title) {
          tableItem.selected = true;
          categoryItem.selected = true;
        } else {
          tableItem.selected = false;
        }
      });
    });

    this.router.navigate(['/admin/events']);
  }
}
