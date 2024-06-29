<script>
	import '../app.css';
	let { children } = $props();
</script>

<div>
        <aside>
            <nav>
                <ul>
                    <li><a href="/month-calendar">Calendrier</a></li>
                    <li><a href="/five-star">5 Star Rating</a></li>
                </ul>
            </nav>
        </aside>
	{@render children()}
</div>
