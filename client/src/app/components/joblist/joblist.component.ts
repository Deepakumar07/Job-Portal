import {
  AfterContentInit,
  Component,
  DoCheck,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { joblist } from 'src/app/model/joblist-model';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { JobreduxService } from 'src/app/service/job-redux';
import { Store } from '@ngrx/store';
import {
  getloginloading,
  getlogivalues,
} from 'src/app/Selectors/login-selector';
import { error } from '@angular/compiler/src/util';
import { DeleteJob } from 'src/app/actions/joblist-action';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css'],
})
export class JoblistComponent implements OnInit, AfterContentInit, OnDestroy {
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
  socialShare: any;
  adminid: string;
  adminjobs: joblist[] = [];
  arrayslice: number = 6;
  adminslice: number = 12;
  searchslice: number = 12;
  constructor(
    private router: Router,
    private ReduxService: JobreduxService,
    private service: AccountService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getAllJobList();
    this.getfeaturedjobs();
    this.getunfeaturedjobs();
  }
  ngAfterContentInit() {
    this.getloginvalue();
  }
  ngOnDestroy() {
    this.adminjobs = [];
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
        this.adminid = data.id;
      } else {
        this.adminame = data.result[0].username;
        this.adminid = data.result[0]._id;
      }
    });
  }

  getMyjobs() {
    if (!this.adminame) {
      alert('You have to login first to get Your Jobs');
    } else {
      const getjobslist$ = this.ReduxService.getalljobs(false)[1];
      const getjobsError$ = this.ReduxService.getalljobs(false)[2];
      getjobslist$.subscribe((data) => {
        // console.log(data);
        if (!this.adminjobs?.length) {
          data.forEach((element) => {
            // console.log(this.adminid);
            // console.log(element.admin);
            if (element.admin == this.adminid) {
              this.adminjobs.push(element);
              // console.log(this.adminjobs);
            }
          });
        }

        if (!this.adminjobs?.length) {
          alert('You have not posted any job');
        }
      }),
        (error) => {
          getjobsError$.subscribe((data) => {
            console.log(data);
          });
        };
    }
  }

  joblocation(val) {
    console.log(val);
  }

  getAccount() {
    if (!this.adminame) {
      alert('You should have to login First');
    } else {
      let id = { id: this.adminid };
      console.log(this.adminid);
      this.router.navigate(['/Account', id]);
    }
  }

  setfavorite(id) {
    console.log(id);
  }

  delete(id) {
    var val = `?id=${id}`;
    const deletejob$ = this.service.Deletejob(val);
    deletejob$.subscribe((data) => {
      if (data.status == true) {
        this.adminjobs.splice(id);
        this.ReduxService.getalljobs(true);
        // this.store.dispatch(new DeleteJob(id));
        alert('job Successfully deleted');
      }
    });
  }

  update(id) {
    this.router.navigate(['/UpdateJob', { id }]);
  }

  getalljobs() {
    this.getsearchedJob = [];
    this.adminjobs = [];
  }

  onSearch(val: { searchJob: String }) {
    if (val.searchJob.length < 1) {
      this.getsearchedJob = [];
      return;
    }
    const getjobslist$ = this.ReduxService.getalljobs(false)[1];
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
    const getjobslist$ = this.ReduxService.getalljobs(false)[1];
    const getjobsError$ = this.ReduxService.getalljobs(false)[2];
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
    const getjobslist$ = this.ReduxService.getalljobs(false)[1];
    const getjobsError$ = this.ReduxService.getalljobs(false)[2];
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
    const getjobsloading$ = this.ReduxService.getalljobs(false)[0];
    const getjobslist$ = this.ReduxService.getalljobs(false)[1];
    const getjobsError$ = this.ReduxService.getalljobs(false)[2];
    getjobsloading$.subscribe((data) => {
      // console.log(data);
    });
    getjobslist$.subscribe((data) => {
      // console.log(data);
      this.joblist = data;
      // console.log(this.joblist);

      var filterjob = [];
      this.joblist.forEach((item) => {
        let count = filterjob.filter(
          (x) => x.jobtype.toUpperCase() == item.jobtype.toUpperCase()
        ).length;

        if (count == 0) {
          filterjob.push(item);
        }
      });

      var filter_location = [];
      this.joblist.forEach((item) => {
        let count = filter_location.filter(
          (x) => x.com_location.toUpperCase() == item.com_location.toUpperCase()
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
  loadless() {
    this.arrayslice = 6;
    this.adminslice = 12;
    this.searchslice = 12;
  }

  loadmore() {
    this.arrayslice = 100;
    this.adminslice = 100;
    this.searchslice = 100;
  }
}
