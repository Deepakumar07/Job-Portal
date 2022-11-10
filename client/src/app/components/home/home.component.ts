import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { joblist } from 'src/app/model/joblist-model';
import { JobreduxService } from '../../service/job-redux';
import { AccountService } from '../../service/account.service';
import { Store } from '@ngrx/store';
import {
  getloginloading,
  getlogivalues,
} from 'src/app/Selectors/login-selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterContentInit {
  joblist: joblist[];
  getfeaturedjob: joblist[] = [];
  getunfeaturedjob: joblist[] = [];
  experience: Array<number> = [1, 2, 3, 4, 5];
  filterjob: Array<any>;
  filterJob_location: Array<any>;
  filter_experience: Array<any>;
  filter_compname: Array<any>;
  getsearchedJob: joblist[] = [];
  adminame: string;

  forcefullloading: boolean = false;

  constructor(
    private router: Router,
    private ReduxService: JobreduxService,
    private service: AccountService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getfeaturedjobs();
    this.getunfeaturedjobs();
    this.getAllJobList();
  }
  ngAfterContentInit() {
    this.getloginvalue();
  }

  ngOnDestroy(): void {
    this.getsearchedJob = [];
  }

  jobdetail(id) {
    // console.log(id);
    this.router.navigate(['/jobdetail', { id }]);
  }

  getloginvalue() {
    const loginloading$ = this.store.select(getloginloading);
    loginloading$.subscribe((data) => {
      // console.log(data);
    });
    const loginvalues$ = this.store.select(getlogivalues);
    loginvalues$.subscribe((data) => {
      // console.log(data);
      if (!data.result) {
        this.adminame = data.name;
      } else {
        this.adminame = data.result[0].username;
      }
    });
  }

  getalljobs() {
    this.getsearchedJob = [];
  }

  onSearch(val: { searchJob: String }) {
    if (val.searchJob.length < 1) {
      this.getsearchedJob = [];
      return;
    }
    const getjobslist$ = this.ReduxService.getalljobs(this.forcefullloading)[1];
    getjobslist$.subscribe((data) => {
      if (!this.getsearchedJob?.length) {
        data.forEach((element) => {
          if (
            element.jobtype.toUpperCase().includes(val.searchJob.toUpperCase())
          ) {
            this.getsearchedJob.push(element);
          }
          if (
            element.com_name.toUpperCase().includes(val.searchJob.toUpperCase())
          ) {
            this.getsearchedJob.push(element);
          }
          if (
            element.com_location
              .toUpperCase()
              .includes(val.searchJob.toUpperCase())
          ) {
            this.getsearchedJob.push(element);
          }
        });
      }
      if (!this.getsearchedJob?.length) {
        alert(`Not Found ${val.searchJob}`);
      }
    });
  }
  getfeaturedjobs() {
    const getjobslist$ = this.ReduxService.getalljobs(this.forcefullloading)[1];
    const getjobsError$ = this.ReduxService.getalljobs(
      this.forcefullloading
    )[2];
    getjobslist$.subscribe((data) => {
      if (!this.getfeaturedjob?.length) {
        data.forEach((element) => {
          if (element.featured == true) {
            this.getfeaturedjob.push(element);
          }
        });
      }
    }),
      (error) => {
        getjobsError$.subscribe((data) => {
          alert(data);
        });
      };
  }
  getunfeaturedjobs() {
    const getjobslist$ = this.ReduxService.getalljobs(this.forcefullloading)[1];
    const getjobsError$ = this.ReduxService.getalljobs(
      this.forcefullloading
    )[2];
    getjobslist$.subscribe((data) => {
      if (!this.getunfeaturedjob?.length) {
        data.forEach((element) => {
          if (element.featured == false) {
            this.getunfeaturedjob.push(element);
          }
        });
      }
    }),
      (error) => {
        getjobsError$.subscribe((data) => {
          alert(data);
        });
      };
  }
  getAllJobList() {
    const getjobsloading$ = this.ReduxService.getalljobs(
      this.forcefullloading
    )[0];
    const getjobslist$ = this.ReduxService.getalljobs(this.forcefullloading)[1];
    const getjobsError$ = this.ReduxService.getalljobs(
      this.forcefullloading
    )[2];
    getjobsloading$.subscribe((data) => {
      // console.log(data);
    });
    getjobslist$.subscribe((data) => {
      // console.log(data);
      this.joblist = data;

      var filterjob = [];
      this.joblist.forEach((item) => {
        let count = filterjob.filter((x) => x.jobtype == item.jobtype).length;

        if (count == 0) {
          filterjob.push(item);
        }
      });

      var filter_location = [];
      this.joblist.forEach((item) => {
        let count = filter_location.filter(
          (x) => x.com_location == item.com_location
        ).length;

        if (count == 0) {
          filter_location.push(item);
        }
      });

      var filter_experience = [];
      this.joblist.forEach((item) => {
        let count = filter_experience.filter(
          (x) => x.com_location == item.com_location
        ).length;

        if (count == 0) {
          filter_experience.push(item);
        }
      });

      var filter_compname = [];
      this.joblist.forEach((item) => {
        let count = filter_compname.filter(
          (x) => x.com_location.toUpperCase() == item.com_location.toUpperCase()
        ).length;

        if (count == 0) {
          filter_compname.push(item);
        }
      });
      this.filter_compname = filter_compname;
      this.filter_experience = filter_experience;
      this.filterjob = filterjob;
      this.filterJob_location = filter_location;
      // console.log(this.filterjob);
      // console.log(this.filterJob_location);
    }),
      (error) => {
        getjobsError$.subscribe((data) => {
          alert(data);
        });
      };
  }
}
