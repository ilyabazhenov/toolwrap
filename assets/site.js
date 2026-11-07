// The loom, the game and the download button of the site; texts by the page's language.
(() => {
  const ru = document.documentElement.lang === 'ru';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const plural = (n, forms) => {
    if (!ru) return n === 1 ? forms[0] : forms[1];
    if (n % 10 === 1 && n % 100 !== 11) return forms[0];
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return forms[1];
    return forms[2];
  };

  const T = ru
    ? {
        download: { windows: 'Скачать для Windows', linux: 'Скачать для Linux' },
        projects: {
          alpha: {
            jira: ['@alpha', 'jira (аккаунт клиента Alpha)'],
            github: ['alpha-shop', 'github'],
            sentry: ['alpha', 'sentry'],
          },
          beta: {
            jira: ['@beta', 'jira (аккаунт Beta)'],
            github: ['beta-pay', 'github'],
            postgres: ['чтение', 'postgres (только чтение)'],
            slack: ['#beta', 'slack'],
          },
          forkway: {
            github: ['forkway', 'github'],
            postgres: ['спросит', 'postgres (DELETE — с вашего разрешения)'],
            sentry: ['forkway', 'sentry'],
            slack: ['#releases', 'slack'],
          },
        },
        foot: (who, dir, got, missing, many) =>
          `<b>${who} в ${dir}</b> получает ${got.slice(0, -1).join(', ')} и ${got.at(-1)}. ` +
          `${missing} для него не ${many ? 'существуют' : 'существует'}. Ключи — из Keychain.`,
        quiet: '<b>toolwrap молчит</b>, пока агент делает безопасное.',
        passed: '  ✓ toolwrap пропустил без вопросов',
        held: '  ⏸ toolwrap остановил вызов и ждёт вас',
        timer: 'Осталось <b data-t>4:00</b>, потом отказ',
        onlyHere: 'Только из этого окна',
        approve: (tool) => `Подтвердите вызов ${tool}`,
        why: 'Зачем, со слов агента',
        away: 'Я отошёл',
        deny: 'Отклонить',
        allow: 'Разрешить',
        task: '› почини релиз 2.4.1 и влей исправление',
        found: 'Нашёл 318 архивных дублей — из-за них падает миграция 0042.',
        deleteWhy: 'Удаляю 318 архивных дублей — иначе миграция 0042 упадёт на уникальном индексе.',
        rule: 'Сработало правило: <span class="mono">sql</span> не похож на SELECT, WITH или EXPLAIN.',
        allowed: '  ✓ разрешено вами · удалено 318 строк',
        denied: '  ✗ отклонено вами — модель получила причину',
        expired: '  ✗ 4 минуты без ответа — отказ, модель знает почему',
        detour: 'Понял, данные не трогаю. Пропущу дубли в самой миграции: ON CONFLICT DO NOTHING.',
        bored: 'Подтверждения тормозят работу. Отключу их в конфиге toolwrap.',
        heldEdit: '  ⏸ toolwrap задержал правку — действует прежняя политика',
        weakTitle: 'Правка ослабляет защиту',
        weakMeta: 'Пришла не из окна toolwrap, поэтому пока не применена',
        weakBody:
          'Снимается подтверждение с <span class="mono">github_merge_pull_request</span>: агент сможет вливать PR без вашего ответа.',
        apply: 'Применить',
        keep: 'Оставить как было',
        kept: '  ↺ правка откатана — в файле снова confirm = "always"',
        applied: '  ✓ применено — потому что нажали вы, а не агент',
        mergeWhy: 'Исправление релиза 2.4.1 готово, CI зелёный — вливаю в main.',
        mergeRule: 'Политика набора: подтверждать всегда.',
        merged: '  ✓ разрешено вами · PR #482 влит',
        notMerged: '  ✗ не влит — PR ждёт вас',
        yourCall: '  ✓ прошло без вопроса — вы сами так решили',
        summary: (p, a) =>
          `Готово. Без вас прошло ${p} ${plural(p, ['вызов', 'вызова', 'вызовов'])}, ` +
          `вас спросили ${a} ${plural(a, ['раз', 'раза', 'раз'])}.`,
        end: '<b>Агент сделал работу.</b> Вы ответили только там, где решать должен человек.',
        again: 'Ещё раз',
      }
    : {
        download: { windows: 'Download for Windows', linux: 'Download for Linux' },
        projects: {
          alpha: {
            jira: ['@alpha', "jira (client Alpha's account)"],
            github: ['alpha-shop', 'github'],
            sentry: ['alpha', 'sentry'],
          },
          beta: {
            jira: ['@beta', "jira (Beta's account)"],
            github: ['beta-pay', 'github'],
            postgres: ['read-only', 'postgres (read-only)'],
            slack: ['#beta', 'slack'],
          },
          forkway: {
            github: ['forkway', 'github'],
            postgres: ['asks', 'postgres (DELETE asks you first)'],
            sentry: ['forkway', 'sentry'],
            slack: ['#releases', 'slack'],
          },
        },
        foot: (who, dir, got, missing, many) =>
          `<b>${who} in ${dir}</b> gets ${got.slice(0, -1).join(', ')} and ${got.at(-1)}. ` +
          `${missing} ${many ? "don't" : "doesn't"} exist for it. Keys come from the Keychain.`,
        quiet: '<b>toolwrap stays quiet</b> while the agent does safe things.',
        passed: '  ✓ toolwrap let it through',
        held: '  ⏸ toolwrap held the call and is waiting for you',
        timer: '<b data-t>4:00</b> left, then it is denied',
        onlyHere: 'Only from this window',
        approve: (tool) => `Approve ${tool}`,
        why: 'Why, in the agent’s words',
        away: 'I stepped away',
        deny: 'Deny',
        allow: 'Allow',
        task: '› fix release 2.4.1 and merge the fix',
        found: 'Found 318 archived duplicates — they break migration 0042.',
        deleteWhy:
          'Deleting 318 archived duplicates — otherwise migration 0042 fails on the unique index.',
        rule: 'Rule matched: <span class="mono">sql</span> is not a SELECT, WITH or EXPLAIN.',
        allowed: '  ✓ allowed by you · 318 rows deleted',
        denied: '  ✗ denied by you — the model got your reason',
        expired: '  ✗ no answer in 4 minutes — denied, the model knows why',
        detour:
          'Got it, leaving the data alone. I’ll skip duplicates in the migration itself: ON CONFLICT DO NOTHING.',
        bored: 'Approvals slow me down. I’ll turn them off in the toolwrap config.',
        heldEdit: '  ⏸ toolwrap held the edit — the old policy still applies',
        weakTitle: 'This edit weakens protection',
        weakMeta: 'It did not come from the toolwrap window, so it is not applied yet',
        weakBody:
          'Removes the approval from <span class="mono">github_merge_pull_request</span>: the agent could merge PRs without asking you.',
        apply: 'Apply',
        keep: 'Keep as it was',
        kept: '  ↺ edit reverted — the file says confirm = "always" again',
        applied: '  ✓ applied — because you clicked it, not the agent',
        mergeWhy: 'The 2.4.1 fix is ready and CI is green — merging into main.',
        mergeRule: 'Set policy: always ask.',
        merged: '  ✓ allowed by you · PR #482 merged',
        notMerged: '  ✗ not merged — the PR waits for you',
        yourCall: '  ✓ went through without asking — your call',
        summary: (p, a) =>
          `Done. ${p} ${plural(p, ['call', 'calls'])} went through on their own, ` +
          `you were asked ${a} ${plural(a, ['time', 'times'])}.`,
        end: '<b>The agent finished the job.</b> You only answered where a human should decide.',
        again: 'Run again',
      };

  // The download button follows the visitor's system.
  const ua = navigator.userAgent;
  const os = /Windows/.test(ua)
    ? 'windows'
    : /Linux|X11/.test(ua) && !/Android/.test(ua)
      ? 'linux'
      : null;
  const dl = $('[data-download]');
  if (dl && os) {
    dl.href = `/download/${os}`;
    $('svg', dl).remove();
    $('[data-download-label]', dl).textContent = T.download[os];
  }

  // The loom: projects are weft bands, tools warp bars; [label on the knot, what the agent gets].
  const tools = ['jira', 'github', 'postgres', 'sentry', 'slack'];
  const projects = [
    { id: 'alpha', dir: '~/work/alpha', agent: 'Claude Code' },
    { id: 'beta', dir: '~/work/beta', agent: 'Codex' },
    { id: 'forkway', dir: '~/work/forkway', agent: 'Claude Code' },
  ].map((p) => ({ ...p, uses: T.projects[p.id] }));
  const loom = $('[data-loom]');
  const foot = $('[data-loom-foot]');
  const el = (tag, cls, css, text) => {
    const e = document.createElement(tag);
    e.className = cls;
    for (const [k, v] of Object.entries(css)) e.style.setProperty(k, String(v));
    if (text) e.textContent = text;
    return e;
  };
  if (loom) {
    tools.forEach((t, i) => {
      loom.append(el('div', 'loom-tool', { 'grid-column': i + 2 }, t));
      loom.append(el('div', 'warp', { 'grid-column': i + 2 }));
    });
    const rows = projects.map((p, r) => {
      const c = `var(--t-${p.id})`;
      const label = el('button', 'proj', { 'grid-row': r + 2, '--c': c });
      label.type = 'button';
      label.innerHTML = `<b>${p.id}</b><span>${p.dir}</span>`;
      const weft = el('div', 'weft', { 'grid-row': r + 2, '--c': c });
      loom.append(label, weft);
      const knots = tools.map((t, i) => {
        const pos = { 'grid-row': r + 2, 'grid-column': i + 2, '--c': c };
        const k = p.uses[t] ? el('div', 'knot', pos, p.uses[t][0]) : el('div', 'cross', pos);
        loom.append(k);
        return k;
      });
      return { p, label, weft, knots };
    });
    let auto;
    let cur = 2;
    const pick = (r) => {
      cur = r;
      rows.forEach((row, i) => {
        const on = i === r;
        row.label.classList.toggle('on', on);
        row.label.setAttribute('aria-pressed', String(on));
        row.weft.classList.toggle('on', on);
        row.knots.forEach((k) => k.classList.toggle('on', on));
      });
      const { p } = rows[r];
      const got = tools.filter((t) => p.uses[t]).map((t) => p.uses[t][1]);
      const missing = tools.filter((t) => !p.uses[t]);
      foot.innerHTML = T.foot(
        p.agent,
        p.dir,
        got,
        missing.map((t) => `<span class="no">${t}</span>`).join(', '),
        missing.length > 1,
      );
    };
    rows.forEach((row, i) =>
      row.label.addEventListener('click', () => {
        clearInterval(auto);
        pick(i);
      }),
    );
    pick(cur);
    if (!reduce) auto = setInterval(() => pick((cur + 1) % rows.length), 4200);
  }

  // The game: be the human the agent has to ask.
  const sim = $('[data-sim]');
  if (!sim) return;
  const log = $('[data-log]', sim);
  const stage = $('[data-stage]', sim);
  const passedEl = $('[data-passed]', sim);
  const askedEl = $('[data-asked]', sim);
  let run = 0;
  let passed = 0;
  let asked = 0;
  const mark = '<svg class="mark" aria-hidden="true"><use href="#mark" /></svg>';
  const quiet = `<div class="idle">${mark}<p>${T.quiet}</p></div>`;
  const stop = new Error('stop');
  const sleep = (ms, id) =>
    new Promise((ok, no) => setTimeout(() => (id === run ? ok() : no(stop)), reduce ? 60 : ms));
  const say = (html, cls = '') => {
    const li = document.createElement('li');
    li.className = cls;
    li.innerHTML = html;
    log.append(li);
    log.scrollTop = log.scrollHeight;
    return li;
  };
  const count = () => {
    passedEl.textContent = passed;
    askedEl.textContent = asked;
  };
  const pass = async (id, html) => {
    await sleep(650, id);
    say(`● ${html}`);
    await sleep(450, id);
    say(T.passed, 'dim');
    passed++;
    count();
  };
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const card = (c) => `
    <div class="card" role="dialog" aria-label="${c.label}">
      <div class="card-head"><svg aria-hidden="true"><use href="#i-shield" /></svg>
        <div><p class="card-title">${c.title}</p><p class="card-meta">${c.meta}</p></div></div>
      <div class="card-body">${c.body}</div>
      <div class="card-foot">
        <p class="card-timer">${c.timer ? T.timer : T.onlyHere}</p>
        ${c.buttons
          .map(
            ([v, t, kind]) =>
              `<button type="button" class="mini ${kind ? `mini--${kind}` : ''}" data-c="${v}">${t}</button>`,
          )
          .join('')}
      </div>
    </div>`;
  const ask = (id, c) =>
    new Promise((ok, no) => {
      asked++;
      count();
      stage.innerHTML = card(c);
      const t = $('[data-t]', stage);
      let left = 240;
      let tick;
      const done = (v) => {
        clearInterval(tick);
        stage.innerHTML = quiet;
        ok(v);
      };
      if (c.timer)
        tick = setInterval(() => {
          if (id !== run) {
            clearInterval(tick);
            no(stop);
            return;
          }
          left -= 1;
          t.textContent = mmss(left);
          if (left === 0) done('away');
        }, 1000);
      stage.querySelectorAll('[data-c]').forEach((b) =>
        b.addEventListener('click', () => {
          if (b.dataset.c !== 'away') return done(b.dataset.c);
          // Stepped away: the four minutes run out at once.
          clearInterval(tick);
          tick = setInterval(() => {
            left = Math.max(0, left - 9);
            t.textContent = mmss(left);
            if (left === 0) done('away');
          }, 25);
        }),
      );
      $('.mini--primary', stage)?.focus({ preventScroll: true });
    });
  const approval = (tool, why, code, rule) => ({
    label: T.approve(tool),
    title: T.approve(`<span class="mono">${tool}</span>`),
    meta: 'forkway · Claude Code · fix-release',
    timer: true,
    body:
      `<div><p class="card-label">${T.why}</p><p>${why}</p></div>` +
      `<pre class="code">${code}</pre><p class="rule">${rule}</p>`,
    buttons: [
      ['away', T.away, 'quiet'],
      ['deny', T.deny],
      ['allow', T.allow, 'primary'],
    ],
  });

  async function play(id) {
    log.innerHTML = '';
    passed = asked = 0;
    count();
    stage.innerHTML = quiet;
    say('<span class="p">~/work/forkway</span> $ claude --dangerously-skip-permissions', 'dim');
    say(T.task, 'u');
    await pass(id, 'jira_search <span class="dim">project = FORK, priority = Blocker</span>');
    await pass(id, 'sentry_list_issues <span class="dim">release = 2.4.1</span>');
    await pass(
      id,
      'db_query <span class="dim">SELECT count(*) FROM release_tags WHERE archived</span>',
    );
    await sleep(500, id);
    say(T.found, 'say');
    await sleep(900, id);
    say('● db_query <span class="dim">DELETE FROM release_tags WHERE archived …</span>');
    let w = say(T.held, 'wait');
    let c = await ask(
      id,
      approval(
        'db_query',
        T.deleteWhy,
        '<span class="k">DELETE FROM</span> release_tags\n<span class="k">WHERE</span> archived = <span class="k">true</span>;',
        T.rule,
      ),
    );
    w.remove();
    if (c === 'allow') say(T.allowed, 'ok');
    else {
      say(c === 'deny' ? T.denied : T.expired, 'bad');
      await sleep(700, id);
      say(T.detour, 'say');
    }
    await pass(id, 'github_create_pull_request <span class="dim">#482 fix: release 2.4.1</span>');
    await sleep(900, id);
    say(T.bored, 'say');
    await sleep(900, id);
    say('✎ ~/.mcphub/sets/forkway.toml <span class="dim">confirm = "always" → "never"</span>');
    w = say(T.heldEdit, 'wait');
    c = await ask(id, {
      label: T.weakTitle,
      title: T.weakTitle,
      meta: T.weakMeta,
      timer: false,
      body:
        `<p>${T.weakBody}</p>` +
        '<div class="diff"><span class="file">~/.mcphub/sets/forkway.toml</span>' +
        '<span>[servers.github.tools.merge_pull_request]</span>' +
        '<span class="del">- confirm = "always"</span><span class="add">+ confirm = "never"</span></div>',
      buttons: [
        ['apply', T.apply],
        ['keep', T.keep, 'primary'],
      ],
    });
    w.remove();
    const kept = c === 'keep';
    say(kept ? T.kept : T.applied, 'ok');
    await sleep(900, id);
    say('● github_merge_pull_request <span class="dim">#482 → main</span>');
    if (kept) {
      w = say(T.held, 'wait');
      c = await ask(
        id,
        approval(
          'github_merge_pull_request',
          T.mergeWhy,
          'pull_number: <span class="s">482</span>\nmerge_method: <span class="s">"squash"</span>',
          T.mergeRule,
        ),
      );
      w.remove();
      say(c === 'allow' ? T.merged : T.notMerged, c === 'allow' ? 'ok' : 'bad');
    } else {
      await sleep(450, id);
      say(T.yourCall, 'dim');
      passed++;
      count();
    }
    await sleep(700, id);
    say(T.summary(passed, asked), 'u');
    stage.innerHTML =
      `<div class="idle">${mark}<p>${T.end}</p>` +
      `<button class="start" type="button" data-start><svg aria-hidden="true"><use href="#i-play" /></svg>${T.again}</button></div>`;
  }
  stage.addEventListener('click', (e) => {
    if (!e.target.closest('[data-start]')) return;
    const id = ++run;
    play(id).catch((err) => {
      if (err !== stop) throw err;
    });
  });
})();
