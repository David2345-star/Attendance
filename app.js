/**
 * 프로젝트 인력 연차관리 시스템 Mobile-First Application Script
 */

// ================= INITIAL MOCK DATA =================
const DEFAULT_USERS = [
  { id: 'user-pm', name: '김부장', role: 'PM', team: 'PM팀', totalDays: 15, usedDays: 3.0, email: 'pm.kim@project.com' },
  { id: 'user-pl-1', name: '이팀장', role: 'PL', team: '개발1팀', totalDays: 15, usedDays: 2.5, email: 'pl.lee@project.com' },
  { id: 'user-pl-2', name: '박팀장', role: 'PL', team: '개발2팀', totalDays: 15, usedDays: 1.5, email: 'pl.park@project.com' },
  { id: 'user-dev-1', name: '최사원', role: 'MEMBER', team: '개발1팀', totalDays: 15, usedDays: 2.5, email: 'dev.choi@project.com' },
  { id: 'user-dev-2', name: '정대리', role: 'MEMBER', team: '개발1팀', totalDays: 15, usedDays: 4.0, email: 'dev.jung@project.com' },
  { id: 'user-dev-3', name: '강선임', role: 'MEMBER', team: '개발2팀', totalDays: 15, usedDays: 1.0, email: 'dev.kang@project.com' },
  { id: 'user-dev-4', name: '윤사원', role: 'MEMBER', team: '개발2팀', totalDays: 15, usedDays: 0.5, email: 'dev.yoon@project.com' }
];

const DEFAULT_LEAVES = [
  // 1. PM Auto-approved leave (shared with PLs)
  {
    id: 'leave-1',
    userId: 'user-pm',
    userName: '김부장',
    userRole: 'PM',
    userTeam: 'PM팀',
    leaveType: 'FULL',
    startDate: '2026-09-25',
    endDate: '2026-09-25',
    daysCount: 1.0,
    reason: '정기 리프레시 휴가',
    status: 'APPROVED',
    createdAt: '2026-09-20 09:30',
    history: [
      { step: '신청 및 자동승인', by: '김부장(PM)', time: '2026-09-20 09:30', comment: 'PM 등록 즉시 자동 승인 (PL 공유 완료)' }
    ]
  },
  // 2. PL leave approved by PM
  {
    id: 'leave-2',
    userId: 'user-pl-1',
    userName: '이팀장',
    userRole: 'PL',
    userTeam: '개발1팀',
    leaveType: 'AM',
    startDate: '2026-09-18',
    endDate: '2026-09-18',
    daysCount: 0.5,
    reason: '건강검진',
    status: 'APPROVED',
    createdAt: '2026-09-15 10:00',
    history: [
      { step: '신청', by: '이팀장(PL)', time: '2026-09-15 10:00', comment: '신청 완료' },
      { step: 'PM 최종승인', by: '김부장(PM)', time: '2026-09-15 14:20', comment: '승인합니다.' }
    ]
  },
  // 3. Member leave approved by PL & PM
  {
    id: 'leave-3',
    userId: 'user-dev-1',
    userName: '최사원',
    userRole: 'MEMBER',
    userTeam: '개발1팀',
    leaveType: 'FULL',
    startDate: '2026-09-11',
    endDate: '2026-09-11',
    daysCount: 1.0,
    reason: '가족 행사 참석',
    status: 'APPROVED',
    createdAt: '2026-09-08 11:00',
    history: [
      { step: '신청', by: '최사원(수행원)', time: '2026-09-08 11:00', comment: '신청 완료' },
      { step: 'PL 1차 승인', by: '이팀장(PL)', time: '2026-09-08 13:00', comment: '확인했습니다.' },
      { step: 'PM 최종승인', by: '김부장(PM)', time: '2026-09-09 09:10', comment: '최종 승인.' }
    ]
  },
  // 4. Member leave waiting for PL approval (개발1팀 최사원)
  {
    id: 'leave-4',
    userId: 'user-dev-1',
    userName: '최사원',
    userRole: 'MEMBER',
    userTeam: '개발1팀',
    leaveType: 'PM',
    startDate: '2026-09-30',
    endDate: '2026-09-30',
    daysCount: 0.5,
    reason: '개인 사유',
    status: 'PENDING_PL',
    createdAt: '2026-09-28 14:00',
    history: [
      { step: '신청', by: '최사원(수행원)', time: '2026-09-28 14:00', comment: 'PL 1차 승인 대기중' }
    ]
  },
  // 5. Member leave passed PL, waiting for PM approval (개발1팀 정대리)
  {
    id: 'leave-5',
    userId: 'user-dev-2',
    userName: '정대리',
    userRole: 'MEMBER',
    userTeam: '개발1팀',
    leaveType: 'FULL',
    startDate: '2026-10-02',
    endDate: '2026-10-02',
    daysCount: 1.0,
    reason: '병원 진료',
    status: 'PENDING_PM',
    createdAt: '2026-09-27 16:30',
    history: [
      { step: '신청', by: '정대리(수행원)', time: '2026-09-27 16:30', comment: '신청 완료' },
      { step: 'PL 1차 승인', by: '이팀장(PL)', time: '2026-09-28 09:30', comment: '일정 확인 및 승인완료' }
    ]
  },
  // 6. PL leave waiting for PM approval (개발2팀 박팀장)
  {
    id: 'leave-6',
    userId: 'user-pl-2',
    userName: '박팀장',
    userRole: 'PL',
    userTeam: '개발2팀',
    leaveType: 'FULL',
    startDate: '2026-10-05',
    endDate: '2026-10-05',
    daysCount: 1.0,
    reason: '개인 휴가',
    status: 'PENDING_PM',
    createdAt: '2026-09-28 17:00',
    history: [
      { step: '신청', by: '박팀장(PL)', time: '2026-09-28 17:00', comment: 'PM 최종 승인 대기중' }
    ]
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'noti-1',
    type: 'PM_SHARE',
    title: '[PM 연차공유] 김부장(PM) 연차 등록',
    message: '김부장(PM)님이 2026-09-25(금) 연차(1일)를 등록하였습니다. (공유 대상: 전체 PL)',
    time: '2026-09-20 09:30',
    targetRoles: ['PL', 'PM']
  }
];

// ================= STATE MANAGEMENT =================
let state = {
  users: [],
  leaves: [],
  notifications: [],
  currentUserId: 'user-pm',
  currentDate: new Date('2026-09-29T10:30:00'),
  activeTab: 'calendar',
  activeApprovalSegment: 'to-approve',
  selectedDayForDetail: null
};

// ================= STORAGE INITIALIZATION =================
function initStorage() {
  const storedUsers = localStorage.getItem('pm_leave_users');
  const storedLeaves = localStorage.getItem('pm_leave_data');
  const storedNotis = localStorage.getItem('pm_leave_notis');
  const storedCurrentUserId = localStorage.getItem('pm_leave_current_user');

  state.users = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;
  state.leaves = storedLeaves ? JSON.parse(storedLeaves) : DEFAULT_LEAVES;
  state.notifications = storedNotis ? JSON.parse(storedNotis) : DEFAULT_NOTIFICATIONS;
  
  if (storedCurrentUserId && state.users.some(u => u.id === storedCurrentUserId)) {
    state.currentUserId = storedCurrentUserId;
  } else {
    state.currentUserId = state.users.length > 0 ? state.users[0].id : 'user-pm';
  }

  saveState();
}

function saveState() {
  localStorage.setItem('pm_leave_users', JSON.stringify(state.users));
  localStorage.setItem('pm_leave_data', JSON.stringify(state.leaves));
  localStorage.setItem('pm_leave_notis', JSON.stringify(state.notifications));
  localStorage.setItem('pm_leave_current_user', state.currentUserId);
}

function resetMockData() {
  if (confirm('모든 사용자 및 연차 데이터를 초기 기본 상태로 리셋하시겠습니까?')) {
    localStorage.removeItem('pm_leave_users');
    localStorage.removeItem('pm_leave_data');
    localStorage.removeItem('pm_leave_notis');
    localStorage.removeItem('pm_leave_current_user');
    initStorage();
    renderAll();
    showToast('데이터가 초기 상태로 리셋되었습니다.', 'info');
  }
}

// ================= HELPER FUNCTIONS =================
function getCurrentUser() {
  return state.users.find(u => u.id === state.currentUserId) || state.users[0];
}

function getUniqueTeams() {
  const teams = Array.from(new Set(state.users.map(u => u.team))).filter(Boolean);
  return teams;
}

function getRoleBadgeColor(role) {
  switch (role) {
    case 'PM': return 'bg-purple-100 text-purple-700 border border-purple-200';
    case 'PL': return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
    case 'MEMBER': return 'bg-slate-100 text-slate-700 border border-slate-200';
    default: return 'bg-slate-100 text-slate-700 border border-slate-200';
  }
}

function getLeaveTypeInfo(type) {
  switch (type) {
    case 'FULL': return { label: '연차', short: '연차', days: 1.0, colorClass: 'bg-indigo-600 text-white', dotClass: 'bg-indigo-600', lightClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    case 'AM': return { label: '오전반차', short: '오전반', days: 0.5, colorClass: 'bg-amber-500 text-white', dotClass: 'bg-amber-500', lightClass: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'PM': return { label: '오후반차', short: '오후반', days: 0.5, colorClass: 'bg-teal-500 text-white', dotClass: 'bg-teal-500', lightClass: 'bg-teal-50 text-teal-700 border-teal-200' };
    default: return { label: '연차', short: '연차', days: 1.0, colorClass: 'bg-indigo-600 text-white', dotClass: 'bg-indigo-600', lightClass: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'APPROVED':
      return `<span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <i data-lucide="check" class="w-3 h-3 mr-0.5"></i>승인완료</span>`;
    case 'PENDING_PL':
      return `<span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
        <i data-lucide="clock" class="w-3 h-3 mr-0.5"></i>PL대기</span>`;
    case 'PENDING_PM':
      return `<span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
        <i data-lucide="clock-3" class="w-3 h-3 mr-0.5"></i>PM대기</span>`;
    case 'REJECTED':
      return `<span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
        <i data-lucide="x" class="w-3 h-3 mr-0.5"></i>반려됨</span>`;
    default:
      return `<span class="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-800">${status}</span>`;
  }
}

function formatDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatNowStr() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

function recalculateUsedDays() {
  state.users.forEach(user => {
    const userApprovedLeaves = state.leaves.filter(l => l.userId === user.id && l.status === 'APPROVED');
    const totalUsed = userApprovedLeaves.reduce((sum, l) => sum + (Number(l.daysCount) || 0), 0);
    user.usedDays = totalUsed;
  });
}

// ================= RENDER LOGIC =================
function renderAll() {
  recalculateUsedDays();
  renderUserSelector();
  renderUserInfoBanner();
  populateTeamFilters();
  renderCalendar();
  renderApprovals();
  renderStats();
  renderUserManagementTable();
  if (window.lucide) {
    lucide.createIcons();
  }
}

// 1. User Selector & Top Info Banner
function renderUserSelector() {
  const selector = document.getElementById('user-selector');
  if (!selector) return;
  selector.innerHTML = state.users.map(u => {
    return `<option value="${u.id}" ${u.id === state.currentUserId ? 'selected' : ''}>
      ${u.name} (${u.role})
    </option>`;
  }).join('');
}

function changeCurrentUser(newUserId) {
  state.currentUserId = newUserId;
  saveState();
  renderAll();
  const u = getCurrentUser();
  showToast(`[${u.name} (${u.role})] 계정으로 전환됨`, 'info');
}

function renderUserInfoBanner() {
  const user = getCurrentUser();
  if (!user) return;
  const remaining = (user.totalDays - user.usedDays).toFixed(1);

  document.getElementById('current-user-name').textContent = user.name;
  document.getElementById('current-user-avatar').textContent = user.name.charAt(0);
  document.getElementById('current-user-role-badge').textContent = user.role;
  document.getElementById('current-user-team').textContent = user.team;
  document.getElementById('current-user-remaining-badge').textContent = `${remaining}일`;

  const summaryEl = document.getElementById('current-user-summary');
  if (user.role === 'PM') {
    summaryEl.textContent = '최고 관리자 • 등록 즉시 승인 및 PL공유';
  } else if (user.role === 'PL') {
    summaryEl.textContent = `${user.team} 1차 승인권자 • 본인 신청 시 PM승인`;
  } else {
    summaryEl.textContent = '수행원 • [PL ➔ PM] 2단계 결재 진행';
  }
}

function populateTeamFilters() {
  const teams = getUniqueTeams();
  const calTeamFilter = document.getElementById('filter-team');
  if (calTeamFilter) {
    const curVal = calTeamFilter.value || 'ALL';
    calTeamFilter.innerHTML = '<option value="ALL">전체 팀</option>' + teams.map(t => `<option value="${t}" ${t === curVal ? 'selected' : ''}>${t}</option>`).join('');
  }
}

// 2. Tab Navigation (Bottom Dock)
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));

  const activeView = document.getElementById(`view-${tabId}`);
  if (activeView) activeView.classList.remove('hidden');

  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (tabId === 'calendar') renderCalendar();
  if (tabId === 'approvals') renderApprovals();
  if (tabId === 'stats') renderStats();
  if (tabId === 'users') renderUserManagementTable();

  if (window.lucide) lucide.createIcons();
}

// Segmented tab switch inside Approvals view
function switchApprovalSegment(segmentId) {
  state.activeApprovalSegment = segmentId;
  ['to-approve', 'my-requests', 'shared'].forEach(seg => {
    const panel = document.getElementById(`panel-${seg}`);
    const btn = document.getElementById(`seg-btn-${seg}`);
    if (panel && btn) {
      if (seg === segmentId) {
        panel.classList.remove('hidden');
        btn.classList.add('active');
      } else {
        panel.classList.add('hidden');
        btn.classList.remove('active');
      }
    }
  });
  if (window.lucide) lucide.createIcons();
}

// 3. Calendar View Logic (Mobile 390px Optimized)
function changeMonth(delta) {
  state.currentDate.setMonth(state.currentDate.getMonth() + delta);
  renderCalendar();
}

function goToday() {
  state.currentDate = new Date('2026-09-29T10:30:00');
  renderCalendar();
}

function isDateInRange(targetDateStr, startDateStr, endDateStr) {
  return targetDateStr >= startDateStr && targetDateStr <= endDateStr;
}

function renderCalendar() {
  const curDate = state.currentDate;
  const year = curDate.getFullYear();
  const month = curDate.getMonth();

  document.getElementById('calendar-month-year').textContent = `${year}년 ${month + 1}월`;

  const filterTeam = document.getElementById('filter-team') ? document.getElementById('filter-team').value : 'ALL';
  const filterType = document.getElementById('filter-type') ? document.getElementById('filter-type').value : 'ALL';
  const filterStatus = document.getElementById('filter-status') ? document.getElementById('filter-status').value : 'APPROVED_ONLY';

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const calendarGrid = document.getElementById('calendar-days');
  if (!calendarGrid) return;
  calendarGrid.innerHTML = '';

  const todayStr = '2026-09-29';

  // 1) Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = prevMonthDays - i;
    const prevDate = new Date(year, month - 1, dayNum);
    const dateStr = formatDateStr(prevDate);
    calendarGrid.appendChild(createMobileDayCell(dayNum, dateStr, true, false));
  }

  // 2) Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const dayDate = new Date(year, month, d);
    const dateStr = formatDateStr(dayDate);
    const isToday = (dateStr === todayStr);
    calendarGrid.appendChild(createMobileDayCell(d, dateStr, false, isToday));
  }

  // 3) Next month leading days
  const totalCells = firstDayIndex + daysInMonth;
  const remainingCells = (totalCells > 35 ? 42 : 35) - totalCells;
  for (let d = 1; d <= remainingCells; d++) {
    const nextDate = new Date(year, month + 1, d);
    const dateStr = formatDateStr(nextDate);
    calendarGrid.appendChild(createMobileDayCell(d, dateStr, true, false));
  }

  if (window.lucide) lucide.createIcons();

  function createMobileDayCell(dayNum, dateStr, isOtherMonth, isToday) {
    const cell = document.createElement('div');
    const dayOfWeek = new Date(dateStr).getDay();

    cell.className = `mobile-cal-cell cursor-pointer ${
      isOtherMonth ? 'other-month' : ''
    } ${isToday ? 'today' : ''}`;

    cell.onclick = () => openDayDetail(dateStr);

    let numColorClass = 'text-slate-700';
    if (dayOfWeek === 0) numColorClass = 'text-red-500 font-bold';
    if (dayOfWeek === 6) numColorClass = 'text-blue-500 font-bold';

    // Day Number & Today indicator
    const header = document.createElement('div');
    header.className = 'w-full flex items-center justify-between px-1';
    header.innerHTML = `
      <span class="text-[11px] leading-none ${numColorClass}">${dayNum}</span>
      ${isToday ? '<span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>' : ''}
    `;
    cell.appendChild(header);

    // Leaves on this date
    const leavesOnThisDate = state.leaves.filter(l => {
      if (!isDateInRange(dateStr, l.startDate, l.endDate)) return false;
      if (filterStatus === 'APPROVED_ONLY' && l.status !== 'APPROVED') return false;
      if (l.status === 'REJECTED') return false;
      if (filterTeam !== 'ALL' && l.userTeam !== filterTeam) return false;
      if (filterType !== 'ALL' && l.leaveType !== filterType) return false;
      return true;
    });

    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'w-full flex flex-col items-center mt-1 space-y-0.5';

    // Show up to 2 badges for compact mobile screens, then +N dot
    leavesOnThisDate.slice(0, 2).forEach(leave => {
      const typeInfo = getLeaveTypeInfo(leave.leaveType);
      const isPending = (leave.status !== 'APPROVED');

      const badge = document.createElement('div');
      badge.className = `cal-mini-badge w-full text-center ${
        isPending
          ? 'bg-slate-200 text-slate-700 border border-dashed border-slate-400'
          : `${typeInfo.colorClass}`
      }`;
      badge.textContent = `${leave.userName.slice(0, 2)}`;
      badgeContainer.appendChild(badge);
    });

    if (leavesOnThisDate.length > 2) {
      const moreIndicator = document.createElement('span');
      moreIndicator.className = 'text-[8px] font-bold text-slate-400';
      moreIndicator.textContent = `+${leavesOnThisDate.length - 2}`;
      badgeContainer.appendChild(moreIndicator);
    }

    cell.appendChild(badgeContainer);
    return cell;
  }
}

// 4. Approvals & My Requests Logic
function renderApprovals() {
  const currentUser = getCurrentUser();
  const toApproveList = document.getElementById('to-approve-list');
  const toApproveBadge = document.getElementById('pending-badge');
  const segPendingBadge = document.getElementById('seg-badge-pending');
  const countBadge = document.getElementById('to-approve-count-badge');

  if (!toApproveList) return;

  let pendingForMe = [];

  if (currentUser.role === 'PM') {
    pendingForMe = state.leaves.filter(l => l.status === 'PENDING_PM');
  } else if (currentUser.role === 'PL') {
    pendingForMe = state.leaves.filter(l => l.status === 'PENDING_PL' && l.userTeam === currentUser.team);
  } else {
    pendingForMe = [];
  }

  // Update badge counter
  if (pendingForMe.length > 0) {
    toApproveBadge.textContent = pendingForMe.length;
    toApproveBadge.classList.remove('hidden');
    segPendingBadge.textContent = pendingForMe.length;
    segPendingBadge.classList.remove('hidden');
    countBadge.textContent = `${pendingForMe.length}건 대기중`;
    countBadge.className = 'px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-700 badge-pulse';
  } else {
    toApproveBadge.classList.add('hidden');
    segPendingBadge.classList.add('hidden');
    countBadge.textContent = '0건 대기';
    countBadge.className = 'px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-500';
  }

  // Render to-approve list
  if (currentUser.role === 'MEMBER') {
    toApproveList.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-2xl border border-dashed border-slate-200 p-4">
        <i data-lucide="shield-alert" class="w-6 h-6 mx-auto mb-1 text-slate-300"></i>
        수행원은 결재 권한이 없습니다.<br/>상단에서 <strong>PM</strong> 또는 <strong>PL</strong>로 전환하여 결재를 진행하세요.
      </div>
    `;
  } else if (pendingForMe.length === 0) {
    toApproveList.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-2xl border border-dashed border-slate-200 p-4">
        <i data-lucide="check-circle" class="w-6 h-6 mx-auto mb-1 text-emerald-400"></i>
        처리할 결재 대기 건이 없습니다.
      </div>
    `;
  } else {
    toApproveList.innerHTML = pendingForMe.map(item => {
      const typeInfo = getLeaveTypeInfo(item.leaveType);
      const isPlStep = item.status === 'PENDING_PL';
      return `
        <div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="font-bold text-slate-900 text-xs">${item.userName}</span>
                <span class="text-[10px] px-1.5 py-0.2 rounded font-semibold ${getRoleBadgeColor(item.userRole)}">${item.userRole}</span>
                <span class="text-[10px] text-slate-500">${item.userTeam}</span>
              </div>
              <p class="text-[11px] font-bold text-indigo-600 mt-1">
                ${item.startDate} ${item.startDate !== item.endDate ? `~ ${item.endDate}` : ''}
              </p>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded font-bold ${typeInfo.lightClass}">${typeInfo.label} (${item.daysCount}일)</span>
          </div>

          <p class="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
            <strong>사유:</strong> ${escapeHtml(item.reason)}
          </p>

          <div class="flex items-center space-x-2 pt-1">
            <button onclick="rejectLeave('${item.id}')" class="flex-1 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition">
              반려
            </button>
            <button onclick="approveLeave('${item.id}')" class="flex-2 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition">
              ${isPlStep ? '1차 승인 (PM전달)' : '최종 승인 확정'}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render My Requests List
  const myRequestsList = document.getElementById('my-requests-list');
  const myRequests = state.leaves.filter(l => l.userId === currentUser.id);

  if (myRequests.length === 0) {
    myRequestsList.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-2xl border border-dashed border-slate-200 p-4">
        신청한 연차 내역이 없습니다.
      </div>
    `;
  } else {
    myRequestsList.innerHTML = myRequests.map(item => {
      const typeInfo = getLeaveTypeInfo(item.leaveType);
      return `
        <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1.5">
              <span class="text-[10px] px-1.5 py-0.2 rounded font-bold ${typeInfo.lightClass}">${typeInfo.label}</span>
              <span class="text-xs font-bold text-slate-800">${item.startDate}</span>
            </div>
            ${getStatusBadge(item.status)}
          </div>
          <p class="text-[11px] text-slate-600 truncate">사유: ${escapeHtml(item.reason)}</p>
          <div class="text-[10px] text-slate-400 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>신청일: ${item.createdAt.slice(5, 16)}</span>
            <span class="font-medium text-slate-600">${item.history[item.history.length - 1]?.step || ''}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Notifications
  renderNotifications();
}

function renderNotifications() {
  const notiList = document.getElementById('notification-list');
  if (!notiList) return;
  const currentUser = getCurrentUser();

  const relevantNotis = state.notifications.filter(n => {
    if (!n.targetRoles) return true;
    return n.targetRoles.includes(currentUser.role);
  });

  if (relevantNotis.length === 0) {
    notiList.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs bg-white rounded-2xl border border-dashed border-slate-200 p-4">
        도착한 알림이나 공유 내역이 없습니다.
      </div>
    `;
  } else {
    notiList.innerHTML = relevantNotis.map(n => `
      <div class="bg-white p-3 rounded-2xl border border-blue-100 shadow-2xs space-y-1">
        <div class="flex items-center justify-between text-xs font-bold text-blue-950">
          <span class="flex items-center"><i data-lucide="bell" class="w-3.5 h-3.5 text-blue-600 mr-1"></i>${n.title}</span>
          <span class="text-[9px] text-slate-400 font-normal">${n.time.slice(5, 16)}</span>
        </div>
        <p class="text-[11px] text-slate-700">${n.message}</p>
      </div>
    `).join('');
  }
}

// 5. Approving / Rejecting Workflow Actions
function approveLeave(leaveId) {
  const currentUser = getCurrentUser();
  const leave = state.leaves.find(l => l.id === leaveId);
  if (!leave) return;

  const nowStr = formatNowStr();

  if (currentUser.role === 'PL' && leave.status === 'PENDING_PL') {
    leave.status = 'PENDING_PM';
    leave.history.push({
      step: 'PL 1차 승인',
      by: `${currentUser.name}(PL)`,
      time: nowStr,
      comment: 'PL 1차 검토 승인 완료'
    });
    showToast(`[${leave.userName}] 연차 1차 승인 완료 (PM 전달)`, 'success');
  } else if (currentUser.role === 'PM' && leave.status === 'PENDING_PM') {
    leave.status = 'APPROVED';
    leave.history.push({
      step: 'PM 최종 승인',
      by: `${currentUser.name}(PM)`,
      time: nowStr,
      comment: 'PM 최종 승인 완료 (확정)'
    });

    state.notifications.unshift({
      id: 'noti-' + Date.now(),
      type: 'APPROVAL_DONE',
      title: `[승인 완료] ${leave.userName} 연차 승인`,
      message: `${leave.userName}님의 ${leave.startDate} 연차가 최종 승인되었습니다.`,
      time: nowStr,
      targetRoles: ['PM', 'PL', 'MEMBER']
    });

    showToast(`[${leave.userName}] 연차 최종 승인 확정!`, 'success');
  } else {
    showToast('승인 권한이 없습니다.', 'error');
    return;
  }

  saveState();
  renderAll();
}

function rejectLeave(leaveId) {
  const currentUser = getCurrentUser();
  const leave = state.leaves.find(l => l.id === leaveId);
  if (!leave) return;

  const reason = prompt('반려 사유를 입력해주세요:', '일정 조율 필요');
  if (reason === null) return;

  const nowStr = formatNowStr();
  leave.status = 'REJECTED';
  leave.history.push({
    step: '반려',
    by: `${currentUser.name}(${currentUser.role})`,
    time: nowStr,
    comment: `반려: ${reason || '사유 미입력'}`
  });

  state.notifications.unshift({
    id: 'noti-' + Date.now(),
    type: 'REJECTED',
    title: `[반려] ${leave.userName} 연차 반려`,
    message: `${leave.userName}님의 ${leave.startDate} 연차가 반려되었습니다. (사유: ${reason})`,
    time: nowStr,
    targetRoles: ['PM', 'PL', 'MEMBER']
  });

  showToast(`[${leave.userName}] 연차가 반려 처리되었습니다.`, 'warning');
  saveState();
  renderAll();
}

// 6. Leave Application Submission & Workflow Route
function openApplyModal(prefilledDate = null) {
  const user = getCurrentUser();
  const remaining = (user.totalDays - user.usedDays).toFixed(1);

  document.getElementById('modal-applicant-name').textContent = `${user.name} (${user.role} / ${user.team})`;
  document.getElementById('modal-applicant-remaining').textContent = `${remaining}일`;

  const defaultDate = prefilledDate || '2026-09-30';
  document.getElementById('apply-start-date').value = defaultDate;
  document.getElementById('apply-end-date').value = defaultDate;
  document.getElementById('apply-reason').value = '';

  document.querySelector('input[name="leaveType"][value="FULL"]').checked = true;
  toggleDateInputs();
  renderWorkflowPreview(user.role);

  document.getElementById('apply-modal').classList.remove('hidden');
}

function closeApplyModal() {
  document.getElementById('apply-modal').classList.add('hidden');
}

function toggleDateInputs() {
  const type = document.querySelector('input[name="leaveType"]:checked').value;
  const endDateWrapper = document.getElementById('end-date-wrapper');
  const startDateInput = document.getElementById('apply-start-date');
  const endDateInput = document.getElementById('apply-end-date');

  if (type === 'AM' || type === 'PM') {
    endDateWrapper.classList.add('hidden');
    endDateInput.required = false;
  } else {
    endDateWrapper.classList.remove('hidden');
    endDateInput.required = true;
  }
}

function renderWorkflowPreview(role) {
  const container = document.getElementById('modal-workflow-preview');
  if (role === 'MEMBER') {
    container.innerHTML = `
      <div class="flex items-center space-x-1.5 text-slate-700">
        <span class="bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded">수행원 신청</span>
        <i data-lucide="arrow-right" class="w-3 h-3 text-slate-400"></i>
        <span class="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">PL 1차</span>
        <i data-lucide="arrow-right" class="w-3 h-3 text-slate-400"></i>
        <span class="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">PM 최종확정</span>
      </div>
    `;
  } else if (role === 'PL') {
    container.innerHTML = `
      <div class="flex items-center space-x-1.5 text-slate-700">
        <span class="bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.2 rounded">PL 신청</span>
        <i data-lucide="arrow-right" class="w-3 h-3 text-slate-400"></i>
        <span class="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">PM 승인 (확정)</span>
      </div>
    `;
  } else if (role === 'PM') {
    container.innerHTML = `
      <div class="flex items-center space-x-1.5 text-slate-700">
        <span class="bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">PM 등록</span>
        <i data-lucide="arrow-right" class="w-3 h-3 text-slate-400"></i>
        <span class="bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">자동 확정</span>
        <span class="text-slate-400">(전체 PL 공유)</span>
      </div>
    `;
  }
  if (window.lucide) lucide.createIcons();
}

function handleLeaveSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  const leaveType = document.querySelector('input[name="leaveType"]:checked').value;
  const startDate = document.getElementById('apply-start-date').value;
  let endDate = document.getElementById('apply-end-date').value;
  const reason = document.getElementById('apply-reason').value.trim();

  if (!startDate) {
    showToast('시작일을 선택해주세요.', 'error');
    return;
  }

  if (leaveType === 'AM' || leaveType === 'PM') {
    endDate = startDate;
  }

  if (startDate > endDate) {
    showToast('종료일이 시작일보다 빠릅니다.', 'error');
    return;
  }

  let dayCount = 1.0;
  if (leaveType === 'AM' || leaveType === 'PM') {
    dayCount = 0.5;
  } else {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diffTime = Math.abs(e - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    dayCount = diffDays * 1.0;
  }

  const remaining = user.totalDays - user.usedDays;
  if (dayCount > remaining) {
    showToast(`잔여 연차(${remaining}일)가 부족합니다.`, 'error');
    return;
  }

  const nowStr = formatNowStr();
  let initialStatus = 'PENDING_PL';
  let historyList = [];

  if (user.role === 'MEMBER') {
    initialStatus = 'PENDING_PL';
    historyList.push({
      step: '신청',
      by: `${user.name}(수행원)`,
      time: nowStr,
      comment: 'PL 1차 승인 대기'
    });
  } else if (user.role === 'PL') {
    initialStatus = 'PENDING_PM';
    historyList.push({
      step: '신청',
      by: `${user.name}(PL)`,
      time: nowStr,
      comment: 'PM 최종 승인 대기'
    });
  } else if (user.role === 'PM') {
    initialStatus = 'APPROVED';
    historyList.push({
      step: '신청 및 자동승인',
      by: `${user.name}(PM)`,
      time: nowStr,
      comment: 'PM 등록 즉시 자동 승인 (각 팀 PL 공유)'
    });

    state.notifications.unshift({
      id: 'noti-' + Date.now(),
      type: 'PM_SHARE',
      title: `[PM 연차공유] ${user.name}(PM) 연차 등록`,
      message: `${user.name}(PM)님이 ${startDate}${startDate !== endDate ? ' ~ ' + endDate : ''} 기간 연차(${dayCount}일)를 등록했습니다.`,
      time: nowStr,
      targetRoles: ['PL', 'PM']
    });
  }

  const newLeave = {
    id: 'leave-' + Date.now(),
    userId: user.id,
    userName: user.name,
    userRole: user.role,
    userTeam: user.team,
    leaveType: leaveType,
    startDate: startDate,
    endDate: endDate,
    daysCount: dayCount,
    reason: reason,
    status: initialStatus,
    createdAt: nowStr,
    history: historyList
  };

  state.leaves.unshift(newLeave);
  saveState();
  closeApplyModal();
  renderAll();

  if (user.role === 'PM') {
    showToast('PM 연차 등록 및 자동 확정 완료!', 'success');
  } else {
    showToast('연차 신청이 완료되었습니다.', 'success');
  }
}

// 7. Day Detail Modal
function openDayDetail(dateStr) {
  state.selectedDayForDetail = dateStr;
  const dayModal = document.getElementById('day-detail-modal');
  const modalTitle = document.getElementById('day-modal-title');
  const modalSubtitle = document.getElementById('day-modal-subtitle');
  const modalList = document.getElementById('day-modal-list');

  modalTitle.textContent = `${dateStr} 연차 현황`;

  const leavesOnDate = state.leaves.filter(l => isDateInRange(dateStr, l.startDate, l.endDate));
  modalSubtitle.textContent = `총 ${leavesOnDate.length}건 등록됨`;

  if (leavesOnDate.length === 0) {
    modalList.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs">
        <i data-lucide="calendar-x" class="w-6 h-6 mx-auto mb-1 text-slate-300"></i>
        이 날짜에 등록된 휴가가 없습니다.
      </div>
    `;
  } else {
    modalList.innerHTML = leavesOnDate.map(l => {
      const typeInfo = getLeaveTypeInfo(l.leaveType);
      return `
        <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="font-bold text-slate-900 text-xs">${l.userName}</span>
              <span class="text-[9px] px-1 py-0.2 rounded font-semibold ${getRoleBadgeColor(l.userRole)}">${l.userRole}</span>
              <span class="text-[10px] text-slate-500">${l.userTeam}</span>
            </div>
            <p class="text-[10px] text-slate-600 mt-0.5"><span class="font-bold text-indigo-600">${typeInfo.label}</span> | ${escapeHtml(l.reason)}</p>
          </div>
          <div>
            ${getStatusBadge(l.status)}
          </div>
        </div>
      `;
    }).join('');
  }

  dayModal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeDayModal() {
  document.getElementById('day-detail-modal').classList.add('hidden');
}

function openApplyForDate() {
  const d = state.selectedDayForDetail;
  closeDayModal();
  openApplyModal(d);
}

// 8. Stats View Logic (Mobile List)
function renderStats() {
  const totalUsersEl = document.getElementById('stat-total-users');
  const todayLeavesEl = document.getElementById('stat-today-leaves');
  const monthLeavesEl = document.getElementById('stat-month-leaves');
  const pendingLeavesEl = document.getElementById('stat-pending-leaves');
  const mobileList = document.getElementById('stats-mobile-list');

  if (!totalUsersEl) return;

  totalUsersEl.textContent = `${state.users.length}명`;

  const todayStr = '2026-09-29';
  const todayLeaves = state.leaves.filter(l => l.status === 'APPROVED' && isDateInRange(todayStr, l.startDate, l.endDate));
  todayLeavesEl.textContent = `${todayLeaves.length}명`;

  const currentMonthPrefix = `2026-${String(state.currentDate.getMonth() + 1).padStart(2, '0')}`;
  const monthlyApprovedLeaves = state.leaves.filter(l => l.status === 'APPROVED' && (l.startDate.startsWith(currentMonthPrefix) || l.endDate.startsWith(currentMonthPrefix)));
  const monthlyTotalDays = monthlyApprovedLeaves.reduce((acc, curr) => acc + curr.daysCount, 0);
  monthLeavesEl.textContent = `${monthlyTotalDays.toFixed(1)}일`;

  const pendingCount = state.leaves.filter(l => l.status === 'PENDING_PL' || l.status === 'PENDING_PM').length;
  pendingLeavesEl.textContent = `${pendingCount}건`;

  mobileList.innerHTML = state.users.map(u => {
    const remaining = (u.totalDays - u.usedDays).toFixed(1);
    const usagePercent = Math.min(100, Math.round((u.usedDays / u.totalDays) * 100)) || 0;

    return `
      <div class="pt-2.5 first:pt-0 space-y-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
              ${u.name.charAt(0)}
            </span>
            <span class="font-bold text-slate-900 text-xs">${u.name}</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded font-semibold ${getRoleBadgeColor(u.role)}">${u.role}</span>
            <span class="text-[10px] text-slate-400">${u.team}</span>
          </div>
          <div class="text-right">
            <span class="text-xs font-bold text-emerald-600">${remaining}일</span>
            <span class="text-[10px] text-slate-400">/ ${u.totalDays}일</span>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="flex items-center space-x-2">
          <div class="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div class="bg-indigo-600 h-1.5 rounded-full" style="width: ${usagePercent}%"></div>
          </div>
          <span class="text-[10px] text-slate-400 w-8 text-right font-medium">${usagePercent}%</span>
        </div>
      </div>
    `;
  }).join('');
}

// ================= 9. USER MANAGEMENT VIEW LOGIC =================
function renderUserManagementTable() {
  const container = document.getElementById('user-cards-list');
  if (!container) return;

  const roleFilter = document.getElementById('user-filter-role') ? document.getElementById('user-filter-role').value : 'ALL';
  const keyword = (document.getElementById('user-search-keyword')?.value || '').trim().toLowerCase();

  const pmCount = state.users.filter(u => u.role === 'PM').length;
  const plCount = state.users.filter(u => u.role === 'PL').length;
  const memberCount = state.users.filter(u => u.role === 'MEMBER').length;

  document.getElementById('user-count-pm').textContent = `${pmCount}명`;
  document.getElementById('user-count-pl').textContent = `${plCount}명`;
  document.getElementById('user-count-member').textContent = `${memberCount}명`;

  const filteredUsers = state.users.filter(u => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (keyword && !u.name.toLowerCase().includes(keyword) && !u.email.toLowerCase().includes(keyword)) return false;
    return true;
  });

  if (filteredUsers.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-xs text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
        일치하는 사용자가 없습니다.
      </div>
    `;
  } else {
    container.innerHTML = filteredUsers.map(u => {
      const remaining = (u.totalDays - u.usedDays).toFixed(1);
      const isCurrentActive = (u.id === state.currentUserId);

      return `
        <div class="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between ${isCurrentActive ? 'ring-2 ring-indigo-500/50 bg-indigo-50/20' : ''}">
          <div class="flex items-center space-x-2.5">
            <span class="w-8 h-8 rounded-full ${u.role === 'PM' ? 'bg-purple-100 text-purple-700' : (u.role === 'PL' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700')} text-xs font-bold flex items-center justify-center">
              ${u.name.charAt(0)}
            </span>
            <div>
              <div class="flex items-center space-x-1.5">
                <span class="font-bold text-slate-900 text-xs">${u.name}</span>
                <span class="text-[9px] px-1.5 py-0.2 rounded font-bold ${getRoleBadgeColor(u.role)}">${u.role}</span>
                ${isCurrentActive ? '<span class="text-[8px] bg-indigo-600 text-white px-1 py-0.2 rounded font-bold">현재</span>' : ''}
              </div>
              <span class="text-[10px] text-slate-400 block">${u.team} • 잔여 ${remaining}일</span>
            </div>
          </div>
          <div class="flex items-center space-x-1">
            <button onclick="editUser('${u.id}')" title="수정" class="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50">
              <i data-lucide="edit-3" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteUser('${u.id}')" title="삭제" class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function toggleCustomTeamInput(val) {
  const customInput = document.getElementById('user-form-team-custom');
  if (val === 'DIRECT') {
    customInput.classList.remove('hidden');
    customInput.required = true;
    customInput.focus();
  } else {
    customInput.classList.add('hidden');
    customInput.required = false;
  }
}

function openUserModal(userIdToEdit = null) {
  const modal = document.getElementById('user-modal');
  const titleEl = document.getElementById('user-modal-title');
  const form = document.getElementById('user-form');
  const idInput = document.getElementById('user-form-id');
  const nameInput = document.getElementById('user-form-name');
  const emailInput = document.getElementById('user-form-email');
  const teamSelect = document.getElementById('user-form-team-select');
  const teamCustom = document.getElementById('user-form-team-custom');
  const totalDaysInput = document.getElementById('user-form-total-days');

  const defaultTeams = ['PM팀', '개발1팀', '개발2팀', '기획팀', 'QA팀'];
  const allTeams = Array.from(new Set([...defaultTeams, ...getUniqueTeams()]));
  teamSelect.innerHTML = allTeams.map(t => `<option value="${t}">${t}</option>`).join('') + '<option value="DIRECT">직접 입력...</option>';

  if (userIdToEdit) {
    const user = state.users.find(u => u.id === userIdToEdit);
    if (!user) return;
    titleEl.textContent = '사용자 정보 수정';
    idInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    totalDaysInput.value = user.totalDays;

    if (allTeams.includes(user.team)) {
      teamSelect.value = user.team;
      teamCustom.classList.add('hidden');
    } else {
      teamSelect.value = 'DIRECT';
      teamCustom.value = user.team;
      teamCustom.classList.remove('hidden');
    }

    const roleRadio = document.querySelector(`input[name="userRole"][value="${user.role}"]`);
    if (roleRadio) roleRadio.checked = true;
  } else {
    titleEl.textContent = '신규 사용자 등록';
    form.reset();
    idInput.value = '';
    totalDaysInput.value = '15';
    teamSelect.value = '개발1팀';
    teamCustom.classList.add('hidden');
    document.querySelector('input[name="userRole"][value="MEMBER"]').checked = true;
  }

  modal.classList.remove('hidden');
}

function closeUserModal() {
  document.getElementById('user-modal').classList.add('hidden');
}

function editUser(userId) {
  openUserModal(userId);
}

function handleUserSubmit(event) {
  event.preventDefault();

  const id = document.getElementById('user-form-id').value;
  const name = document.getElementById('user-form-name').value.trim();
  const email = document.getElementById('user-form-email').value.trim();
  const teamSelect = document.getElementById('user-form-team-select').value;
  const teamCustom = document.getElementById('user-form-team-custom').value.trim();
  const totalDays = parseFloat(document.getElementById('user-form-total-days').value) || 15;
  const role = document.querySelector('input[name="userRole"]:checked').value;

  const team = (teamSelect === 'DIRECT' ? teamCustom : teamSelect) || '개발1팀';

  if (!name || !email) {
    showToast('성명과 이메일을 입력하세요.', 'error');
    return;
  }

  if (id) {
    const existingUser = state.users.find(u => u.id === id);
    if (existingUser) {
      existingUser.name = name;
      existingUser.email = email;
      existingUser.team = team;
      existingUser.role = role;
      existingUser.totalDays = totalDays;

      state.leaves.forEach(l => {
        if (l.userId === id) {
          l.userName = name;
          l.userTeam = team;
          l.userRole = role;
        }
      });
      showToast(`[${name}] 정보 수정 완료`, 'success');
    }
  } else {
    const newId = 'user-' + Date.now();
    const newUser = {
      id: newId,
      name: name,
      email: email,
      team: team,
      role: role,
      totalDays: totalDays,
      usedDays: 0.0
    };
    state.users.push(newUser);
    showToast(`신규 인력 [${name}] 등록 완료`, 'success');
  }

  saveState();
  closeUserModal();
  renderAll();
}

function deleteUser(userId) {
  const user = state.users.find(u => u.id === userId);
  if (!user) return;

  if (state.users.length <= 1) {
    showToast('최소 1명의 사용자가 필요합니다.', 'error');
    return;
  }

  if (user.id === state.currentUserId) {
    showToast('현재 선택된 사용자는 삭제할 수 없습니다.', 'error');
    return;
  }

  if (!confirm(`[${user.name} (${user.role})] 사용자를 삭제하시겠습니까?`)) {
    return;
  }

  state.users = state.users.filter(u => u.id !== userId);
  state.leaves = state.leaves.filter(l => l.userId !== userId);

  saveState();
  renderAll();
  showToast(`[${user.name}] 사용자 삭제 완료`, 'info');
}

// 10. Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');

  let bgClass = 'bg-slate-900 text-white';
  let iconName = 'info';
  if (type === 'success') {
    bgClass = 'bg-emerald-600 text-white';
    iconName = 'check-circle';
  } else if (type === 'error') {
    bgClass = 'bg-red-600 text-white';
    iconName = 'alert-triangle';
  } else if (type === 'warning') {
    bgClass = 'bg-amber-600 text-white';
    iconName = 'alert-circle';
  }

  toast.className = `toast px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center space-x-2 text-xs font-semibold ${bgClass}`;
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 shrink-0"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 250);
  }, 2500);
}

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ================= APP INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderAll();
});
